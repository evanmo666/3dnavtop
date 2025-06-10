"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AddLinkPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    subcategory: '',
    featured: false,
    order: 0
  });

  // 模拟类别数据
  const categories = [
    { value: 'Software', label: 'Software' },
    { value: 'Tutorials', label: 'Tutorials' },
    { value: 'Plugins', label: 'Plugins' },
    { value: 'Assets', label: 'Assets' },
    { value: 'Communities', label: 'Communities' },
    { value: 'Inspiration', label: 'Inspiration' }
  ];

  // 权限检查
  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || (session && session.user.role !== 'admin')) {
    router.push('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url || !formData.category) {
      setError('Please fill in all required fields.');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // 提交到API
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred when adding the link');
      }
      
      setSuccess('Link added successfully!');
      
      // 重置表单
      setFormData({
        title: '',
        url: '',
        description: '',
        category: '',
        subcategory: '',
        featured: false,
        order: 0
      });
      
      // 等待几秒后返回到链接列表
      setTimeout(() => {
        router.push('/admin/links');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Add New Link</h1>
          <p className="text-gray-600">Add a new resource to the 3D navigation</p>
        </div>
        <Link 
          href="/admin/links" 
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
        >
          Back to Links
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="url">
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="url"
                name="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="subcategory">
                Subcategory
              </label>
              <input
                type="text"
                id="subcategory"
                name="subcategory"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.subcategory}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="order">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                name="order"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.order}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                className="h-5 w-5 text-blue-600"
                checked={formData.featured}
                onChange={handleChange}
              />
              <label className="ml-2 text-gray-700" htmlFor="featured">
                Featured Link
              </label>
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 