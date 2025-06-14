"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { allLinks, categories } from '../data/links';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLinks: 0,
    categories: 0,
    featuredLinks: 0
  });

  useEffect(() => {
    // 检查认证状态
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      if (!session.user || session.user.role !== 'admin') {
        router.push('/');
        return;
      }

      // 加载仪表盘数据
      fetchStats();
    }
  }, [status, session, router]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // 从实际数据源计算统计信息
      const totalLinks = allLinks.length;
      const featuredLinks = allLinks.filter(link => link.featured).length;
      const totalCategories = categories.length - 1; // 减去'all'分类
      
      // 详细调试信息
      console.log('=== 后台管理数据统计调试 ===');
      console.log('allLinks总数:', totalLinks);
      console.log('allLinks数组:', allLinks.slice(0, 3)); // 显示前3个链接
      console.log('特色链接数:', featuredLinks);
      console.log('特色链接列表:', allLinks.filter(link => link.featured).map(link => link.title));
      console.log('categories总数:', categories.length);
      console.log('实际分类数(减去all):', totalCategories);
      console.log('categories列表:', categories.map(cat => cat.title));
      console.log('================================');
      
      setStats({
        totalLinks,
        categories: totalCategories,
        featuredLinks
      });
      
      console.log('统计数据更新:', {
        totalLinks,
        categories: totalCategories,
        featuredLinks
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch stats', error);
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your 3D resource links</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Total Links</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalLinks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Categories</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.categories}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Featured Links</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.featuredLinks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/links/new" 
            className="bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-lg text-center"
          >
            Add New Link
          </Link>
          <Link 
            href="/admin/links" 
            className="bg-gray-700 hover:bg-gray-800 transition text-white p-4 rounded-lg text-center"
          >
            Manage Links
          </Link>
          <div className="bg-amber-600 opacity-50 cursor-not-allowed text-white p-4 rounded-lg text-center">
            Edit Featured Links
            <div className="text-xs mt-1">(Coming Soon)</div>
          </div>
          <div className="bg-green-600 opacity-50 cursor-not-allowed text-white p-4 rounded-lg text-center">
            Manage Users
            <div className="text-xs mt-1">(Coming Soon)</div>
          </div>
        </div>
      </div>

      {/* 最近添加的链接 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recently Added Links</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* 显示最新的5个链接 */}
              {allLinks.slice(-5).reverse().map((link) => (
                <tr key={link._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{link.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                      {link.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={link.url} className="text-blue-600 hover:underline truncate block max-w-xs" target="_blank" rel="noopener noreferrer">
                      {new URL(link.url).hostname}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {link.featured ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href="/admin/links" className="text-blue-600 hover:text-blue-900 mr-3">Edit</Link>
                    <span className="text-gray-400 cursor-not-allowed">Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Link 
              href="/admin/links" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all {allLinks.length} links &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 