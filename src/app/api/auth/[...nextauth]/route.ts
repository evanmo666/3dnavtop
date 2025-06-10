import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/app/models/User';
import { connectDB } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请提供电子邮件和密码');
        }
        
        // 查找用户
        const user = await User.findOne({ email: credentials.email }).select('+password');
        
        if (!user) {
          throw new Error('未找到用户');
        }
        
        // 检查密码
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordCorrect) {
          throw new Error('密码不正确');
        }
        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 