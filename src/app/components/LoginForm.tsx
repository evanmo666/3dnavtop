"use client"

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 定义调试信息类型
interface DebugInfo {
  time?: string;
  time_end?: string;
  action?: string;
  email?: string;
  result?: any;
  error?: string;
  stack?: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('请填写邮箱和密码');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // 登录前记录状态
      setDebugInfo({
        time: new Date().toISOString(),
        action: 'login-start',
        email
      });
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      // 登录后记录结果
      setDebugInfo((prev: DebugInfo | null) => ({
        ...prev || {},
        time_end: new Date().toISOString(),
        action: 'login-complete',
        result
      }));
      
      if (result?.error) {
        console.error('登录错误:', result.error);
        setError(result.error);
        return;
      }
      
      if (result?.ok) {
        console.log('登录成功，准备跳转...');
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      console.error('登录过程发生错误:', err);
      setError(err.message || '登录失败，请稍后再试');
      
      setDebugInfo((prev: DebugInfo | null) => ({
        ...prev || {},
        error: err.message,
        stack: err.stack
      }));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          邮箱地址
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="管理员邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          密码
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="管理员密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="p-2 text-sm text-red-600 bg-red-50 rounded border border-red-200">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </div>
      
      <div className="flex items-center justify-center">
        <Link 
          href="/admin/setup" 
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          初始化管理员账户
        </Link>
      </div>
      
      {/* 调试信息 */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200 text-xs">
          <p className="font-semibold mb-1">调试详情:</p>
          <pre className="overflow-auto max-h-32 text-gray-600">{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </form>
  );
} 