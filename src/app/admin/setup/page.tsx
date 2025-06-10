import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// 动态导入客户端组件
const AdminSetupForm = dynamic(() => import('../../components/AdminSetupForm'));

export const metadata: Metadata = {
  title: '3DNav管理员设置',
  description: '初始化3D设计导航管理员账户',
}

export default function AdminSetupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto">
          <Link href="/" className="text-2xl font-bold text-indigo-600">3D Nav</Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">管理员账户设置</h1>
          <AdminSetupForm />
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 mb-2">说明:</h2>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 此页面用于初始化或重置管理员账户</li>
              <li>• 操作会删除所有现有管理员账户</li>
              <li>• 完成后将创建一个新的管理员账户</li>
              <li>• 初始化完成后，请使用新账户登录</li>
            </ul>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
                返回登录页面
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 