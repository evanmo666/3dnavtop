"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function AdminSetupForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
    admin?: any;
  } | null>(null);
  const [forceCreate, setForceCreate] = useState(false);
  
  const handleSetup = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ force: forceCreate })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({
        success: false,
        message: '设置过程中发生错误: ' + (error.message || '未知错误')
      });
      console.error('Setup error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">默认管理员信息</h2>
        <div className="mt-2 space-y-2 text-sm text-gray-500">
          <p>邮箱: admin@3dnav.top</p>
          <p>密码: admin123456</p>
          <p className="text-red-500 font-medium">请成功创建后立即登录并修改默认密码！</p>
        </div>
      </div>
      
      {result && (
        <div className={`p-4 rounded-md ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`text-sm font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
            {result.message}
          </p>
          
          {/* 显示管理员信息 */}
          {result.success && result.data && (
            <div className="mt-2 text-sm text-gray-600">
              <p>邮箱: {result.data.email}</p>
              {result.data.password && (
                <p className="text-red-600 font-medium">密码: {result.data.password}</p>
              )}
            </div>
          )}
          
          {/* 已存在管理员账号 */}
          {!result.success && result.admin && (
            <div className="mt-2 text-sm text-gray-600">
              <p>现有管理员邮箱: {result.admin.email}</p>
              <div className="mt-2 flex items-center">
                <input
                  id="force-create"
                  name="force-create"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={forceCreate}
                  onChange={(e) => setForceCreate(e.target.checked)}
                />
                <label htmlFor="force-create" className="ml-2 block text-sm text-red-700 font-medium">
                  强制创建新管理员账号（将删除现有账号）
                </label>
              </div>
            </div>
          )}
          
          {/* 登录链接 */}
          {result.success && (
            <div className="mt-2">
              <Link 
                href="/login" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                前往登录页面 &rarr;
              </Link>
            </div>
          )}
        </div>
      )}
      
      <div>
        <button
          onClick={handleSetup}
          disabled={loading || (result ? result.success : false)}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading 
              ? 'bg-indigo-300 cursor-not-allowed' 
              : (result && result.success)
                ? 'bg-green-600 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {loading 
            ? '设置中...' 
            : (result && result.success) 
              ? '设置成功' 
              : forceCreate
                ? '强制创建管理员账户'
                : '创建管理员账户'}
        </button>
      </div>
    </div>
  );
} 