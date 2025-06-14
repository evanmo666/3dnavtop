"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { categories, allLinks } from "@/app/data/links"

export default function EditLinkPage() {
  const router = useRouter()
  const params = useParams()
  const linkId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    subcategory: '',
    featured: false,
    order: 0
  })

  // 从静态数据中获取链接信息
  useEffect(() => {
    const link = allLinks.find(l => l._id === linkId)
    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description || '',
        category: link.category,
        subcategory: link.subcategory || '',
        featured: link.featured || false,
        order: link.order || 0
      })
    } else {
      setError('链接不存在')
    }
  }, [linkId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/links/${linkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        alert(result.message || '链接更新成功！')
        router.push('/admin/links')
      } else {
        setError(`更新失败: ${result.error}`)
      }
    } catch (error) {
      console.error('更新链接失败:', error)
      setError('更新链接失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleDelete = async () => {
    if (!confirm('确定要删除这个链接吗？此操作不可撤销。')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/links/${linkId}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        alert(result.message || '链接删除成功！')
        router.push('/admin/links')
      } else {
        setError(`删除失败: ${result.error}`)
      }
    } catch (error) {
      console.error('删除链接失败:', error)
      setError('删除链接失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 过滤掉'all'分类，只显示实际分类
  const availableCategories = categories.filter(cat => cat.id !== 'all')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* 头部导航 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">编辑链接</h1>
            <p className="text-gray-600">修改链接信息</p>
            <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md inline-block">
              📁 文件模式 - 数据将永久保存到文件
            </div>
          </div>
          <Link 
            href="/admin/links" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
          >
            返回链接管理
          </Link>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* 表单 */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="例如：Blender"
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
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                  描述
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="简要描述这个工具的功能和特点"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                  分类 <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">选择分类</option>
                  {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="subcategory">
                  子分类
                </label>
                <input
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  placeholder="可选的子分类"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="order">
                  排序权重
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="h-5 w-5 text-blue-600"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                <label className="ml-2 text-gray-700" htmlFor="featured">
                  设为特色链接
                </label>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                disabled={isLoading}
              >
                删除链接
              </button>
              
              <div className="flex space-x-4">
                <Link 
                  href="/admin/links"
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? '更新中...' : '更新链接'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 