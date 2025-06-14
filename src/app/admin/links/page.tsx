"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LinkItem {
  _id: string;
  title: string;
  url: string;
  category: string;
  subcategory?: string;
  featured: boolean;
  createdAt: string;
}

export default function LinksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 模拟类别数据
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Software', label: 'Software' },
    { value: 'Tutorials', label: 'Tutorials' },
    { value: 'Plugins', label: 'Plugins' },
    { value: 'Assets', label: 'Assets' },
    { value: 'Communities', label: 'Communities' },
    { value: 'Inspiration', label: 'Inspiration' }
  ];

  // 模拟链接数据
  const mockLinks: LinkItem[] = [
    {
      _id: '1',
      title: 'Maxon Cinema 4D Official',
      url: 'https://www.maxon.net/zh/cinema-4d',
      category: 'Software',
      featured: true,
      createdAt: '2023-05-10T00:00:00.000Z'
    },
    {
      _id: '2',
      title: 'Blender Official',
      url: 'https://www.blender.org/',
      category: 'Software',
      featured: true,
      createdAt: '2023-05-11T00:00:00.000Z'
    },
    {
      _id: '3',
      title: 'Greyscalegorilla',
      url: 'https://greyscalegorilla.com/',
      category: 'Resources',
      subcategory: 'Textures',
      featured: true,
      createdAt: '2023-05-12T00:00:00.000Z'
    },
    {
      _id: '4',
      title: 'Blender Guru',
      url: 'https://www.youtube.com/@blenderguru',
      category: 'Tutorials',
      featured: false,
      createdAt: '2023-05-13T00:00:00.000Z'
    },
    {
      _id: '5',
      title: 'Poly Haven',
      url: 'https://polyhaven.com/',
      category: 'Assets',
      featured: false,
      createdAt: '2023-05-14T00:00:00.000Z'
    },
    {
      _id: '6',
      title: 'Blender Artists Community',
      url: 'https://blenderartists.org/',
      category: 'Communities',
      featured: false,
      createdAt: '2023-05-15T00:00:00.000Z'
    },
    {
      _id: '7',
      title: 'ArtStation',
      url: 'https://www.artstation.com/',
      category: 'Inspiration',
      featured: false,
      createdAt: '2023-05-16T00:00:00.000Z'
    },
    {
      _id: '8',
      title: 'TurboSquid',
      url: 'https://www.turbosquid.com/',
      category: 'Assets',
      featured: false,
      createdAt: '2023-05-17T00:00:00.000Z'
    },
    {
      _id: '9',
      title: 'CGTrader',
      url: 'https://www.cgtrader.com/',
      category: 'Assets',
      featured: false,
      createdAt: '2023-05-18T00:00:00.000Z'
    },
    {
      _id: '10',
      title: 'Octane Render',
      url: 'https://home.otoy.com/render/octane-render/',
      category: 'Plugins',
      featured: false,
      createdAt: '2023-05-19T00:00:00.000Z'
    },
    {
      _id: '11',
      title: 'X-Particles',
      url: 'https://insydium.ltd/',
      category: 'Plugins',
      featured: false,
      createdAt: '2023-05-20T00:00:00.000Z'
    },
    {
      _id: '12',
      title: 'Behance',
      url: 'https://www.behance.net/',
      category: 'Inspiration',
      featured: false,
      createdAt: '2023-05-21T00:00:00.000Z'
    }
  ];

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

      // 加载链接数据
      fetchLinks();
    }
  }, [status, session, router]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      // 在实际项目中，这里会调用API获取链接数据
      // const response = await fetch('/api/links');
      // const data = await response.json();
      // setLinks(data);
      
      // 使用模拟数据
      setLinks(mockLinks);
      setLoading(false);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch links');
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) {
      return;
    }
    
    try {
      // 在实际项目中，这里会调用API删除链接
      // await fetch(`/api/links/${id}`, {
      //   method: 'DELETE',
      // });
      
      // 模拟删除操作
      setLinks(links.filter(link => link._id !== id));
    } catch (error: any) {
      setError(error.message || 'Failed to delete link');
    }
  };

  // 过滤和搜索链接
  const filteredLinks = links.filter(link => {
    const matchesCategory = filterCategory ? link.category === filterCategory : true;
    const matchesSearch = searchTerm
      ? link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });

  // 分页计算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Links</h1>
          <p className="text-gray-600">View, edit, and delete resource links</p>
        </div>
        <Link 
          href="/admin/links/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Add New Link
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* 过滤和搜索工具栏 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category-filter">
              Filter by Category
            </label>
            <select
              id="category-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="search">
              Search Links
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by title or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 链接表格 */}
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
                Added Date
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
            {currentLinks.length > 0 ? (
              currentLinks.map((link) => (
                <tr key={link._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{link.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {link.category}
                    </span>
                    {link.subcategory && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {link.subcategory}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={link.url} className="text-blue-600 hover:underline truncate block max-w-xs" target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(link.createdAt)}
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
                    <Link href={`/admin/links/${link._id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteLink(link._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No links found. Try adjusting your filters or add a new link.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* 分页控件 */}
        {filteredLinks.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredLinks.length)}
                </span>{' '}
                of <span className="font-medium">{filteredLinks.length}</span> results
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 