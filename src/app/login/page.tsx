import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// 动态导入客户端组件
const LoginForm = dynamic(() => import('../components/LoginForm'));

export const metadata: Metadata = {
  title: '3DNav登录',
  description: '登录到3D设计导航管理系统',
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto">
          <Link href="/" className="text-2xl font-bold text-indigo-600">3D Nav</Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">管理员登录</h1>
          <LoginForm />
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 mb-2">系统信息:</h2>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 环境: {process.env.NODE_ENV}</li>
              <li>• MongoDB状态: {process.env.MONGODB_URI ? '已配置' : '未配置'}</li>
              <li>• NextAuth密钥: {process.env.NEXTAUTH_SECRET ? '已配置' : '未配置'}</li>
            </ul>
            <p className="text-xs text-gray-400 mt-2">如遇登录问题，请联系管理员</p>
            <div className="mt-3 text-center">
              <Link href="/admin/setup" className="text-xs text-indigo-600 hover:text-indigo-500">
                初始化管理员账户
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 