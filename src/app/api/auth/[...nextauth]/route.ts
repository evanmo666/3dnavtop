import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/app/models/User';
import { connectDB } from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import memoryDB from '@/app/lib/memorydb';

// 标记是否使用内存数据库模式
let useMemoryDB = false;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("开始认证过程", credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.error("认证失败: 缺少邮箱或密码");
            throw new Error('请提供电子邮件和密码');
          }
          
          try {
            // 尝试连接到MongoDB
            const dbConnection = await connectDB();
            // 检查是否使用内存数据库模式
            useMemoryDB = !!(dbConnection as any)?.memoryMode;
            console.log("数据库连接模式:", useMemoryDB ? "内存模式" : "MongoDB模式");
          } catch (error) {
            console.error("数据库连接失败，切换到内存模式:", error);
            useMemoryDB = true;
          }
          
          let user;
          let isPasswordCorrect = false;
          
          if (useMemoryDB) {
            // 内存数据库模式
            console.log("使用内存数据库查找用户:", credentials.email);
            user = await memoryDB.findUserByEmail(credentials.email);
            
            if (!user) {
              // 如果是第一次使用，创建默认管理员账户
              if (credentials.email === 'admin@3dnav.top' && credentials.password === 'admin123456') {
                console.log("创建默认管理员账户");
                user = await memoryDB.createUser({
                  email: 'admin@3dnav.top',
                  password: 'admin123456',  // 将在createUser中加密
                  name: 'Admin',
                  role: 'admin'
                });
                isPasswordCorrect = true;
              } else {
                console.error("认证失败: 未找到用户", credentials.email);
                throw new Error('未找到用户');
              }
            } else {
              console.log("找到用户:", user.email, user.role);
              // 检查密码
              isPasswordCorrect = await memoryDB.comparePassword(credentials.password, user.password);
            }
          } else {
            // MongoDB模式
            console.log("使用MongoDB查找用户:", credentials.email);
            user = await User.findOne({ email: credentials.email }).select('+password');
            
            if (!user) {
              console.error("认证失败: 未找到用户", credentials.email);
              throw new Error('未找到用户');
            }
            
            console.log("找到用户:", user.email, user.role);
            
            // 检查密码
            isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          }
          
          console.log("密码验证结果:", isPasswordCorrect);
          
          if (!isPasswordCorrect) {
            console.error("认证失败: 密码不正确");
            throw new Error('密码不正确');
          }
          
          console.log("认证成功:", user.email, user.role);
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          console.error("认证过程中出错:", error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: any }) {
      if (user) {
        console.log("JWT回调 - 用户数据:", user);
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token && session.user) {
        console.log("Session回调 - token数据:", token);
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'development_secret_key'
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 