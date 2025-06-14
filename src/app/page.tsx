"use client";

import Link from 'next/link';
import { LinkCard } from './components/ui/LinkCard';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allLinks, categories } from './data/links';
import { ILink } from './models/Link';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // 创建分类的引用，用于滚动定位
  const categoryRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // 添加调试信息
  useEffect(() => {
    console.log('=== 前台页面数据统计调试 ===');
    console.log('allLinks总数:', allLinks.length);
    console.log('allLinks数组:', allLinks.slice(0, 3)); // 显示前3个链接
    console.log('特色链接数:', allLinks.filter(link => link.featured).length);
    console.log('特色链接列表:', allLinks.filter(link => link.featured).map(link => link.title));
    console.log('categories总数:', categories.length);
    console.log('实际分类数(减去all):', categories.length - 1);
    console.log('categories列表:', categories.map(cat => cat.title));
    console.log('================================');
  }, []);
  
  // 设置ref的函数
  const setCategoryRef = (id: string) => (el: HTMLDivElement | null) => {
    categoryRefs.current[id] = el;
  };
  
  // 处理分类点击
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 滚动到对应分类位置
      categoryRefs.current[categoryId]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };
  
  // 筛选链接
  const filteredLinks = searchTerm 
    ? allLinks.filter(link => 
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (link.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      )
    : allLinks;
  
  // 按分类分组链接
  const groupedLinks = categories.slice(1).reduce((acc, category) => {
    acc[category.id] = filteredLinks.filter(link => link.category === category.id);
    return acc;
  }, {} as {[key: string]: ILink[]});
  
  // 特色链接
  const featuredLinks = allLinks.filter(link => link.featured);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 英雄区域 */}
      <section className="relative text-white py-16 overflow-hidden">
        {/* 背景图片层 */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/blackgroud.jpg)',
          }}
        ></div>
        
        {/* 渐变叠加层，提供透明度和确保文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80"></div>
        
        {/* 装饰性光效 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative mx-auto px-4 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            3D Designers Navigation
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the best tools, tutorials, and resources for Cinema 4D and Blender
          </p>
          
          {/* 搜索栏 - 增强视觉效果 */}
          <div className="max-w-2xl mx-auto">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105 shadow-2xl' : 'shadow-xl'}`}>
              {/* 搜索框发光效果 - 移到input下方避免阻挡点击 */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-lg transition-opacity duration-300 pointer-events-none ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
              <input
                type="text"
                placeholder="Search for resources..."
                className="relative w-full px-6 py-5 rounded-full text-gray-800 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 transition-all duration-300 z-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none z-20">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* 主内容区域 - 采用左侧菜单，右侧内容的布局 */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左侧分类菜单 */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">Categories</h2>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-md transition flex items-center ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-xl">{category.icon}</span>
                    <span>{category.title}</span>
                    {category.id !== 'all' && groupedLinks[category.id] && (
                      <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                        {groupedLinks[category.id].length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </nav>
              
              {/* 其他链接 */}
              <div className="mt-8 pt-4 border-t">
                <h3 className="font-medium text-gray-700 mb-2">More</h3>
                <Link 
                  href="/about"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition"
                >
                  About Us
                </Link>
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
          
          {/* 右侧内容区域 */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* 特色资源区域 */}
            {!searchTerm && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b text-gray-900">Featured Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {featuredLinks.map((link, index) => (
                    <motion.div
                      key={link._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                    >
                      <LinkCard link={link} featured={true} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 搜索结果 */}
            {searchTerm && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b text-gray-900">
                  Search Results for "{searchTerm}"
                </h2>
                {filteredLinks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {filteredLinks.map((link, index) => (
                        <motion.div
                          key={link._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.15, delay: index * 0.01 }}
                          layout
                        >
                          <LinkCard link={link} featured={link.featured} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search term
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* 按分类显示资源 */}
            {!searchTerm && categories.slice(1).map((category) => (
              <div 
                key={category.id}
                className="mb-12"
                ref={setCategoryRef(category.id)}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center pb-2 border-b text-gray-900" id={`category-${category.id}`}>
                  <span className="mr-3 text-2xl">{category.icon}</span>
                  <span>{category.title}</span>
                </h2>
                
                {groupedLinks[category.id]?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {groupedLinks[category.id].map((link, index) => (
                      <motion.div
                        key={link._id}
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.15, delay: index * 0.01 }}
                      >
                        <LinkCard link={link} featured={link.featured} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600">No resources in this category yet</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 底部CTA区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Contribute?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Help us make this resource collection even better by suggesting new links or improvements
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition"
          >
            Submit Resource
          </Link>
        </div>
      </section>
    </div>
  );
}
