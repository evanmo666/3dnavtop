"use client";

import Link from 'next/link';
import { CategoryCard } from './components/ui/CategoryCard';
import { LinkCard } from './components/ui/LinkCard';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 分类数据
const categories = [
  { id: 'all', title: 'All Resources', icon: '🌐' },
  { id: 'software', title: 'Software', icon: '💻' },
  { id: 'tutorials', title: 'Tutorials', icon: '🎓' },
  { id: 'plugins', title: 'Plugins', icon: '🧩' },
  { id: 'assets', title: 'Assets', icon: '🏆' },
  { id: 'communities', title: 'Communities', icon: '👥' },
  { id: 'inspiration', title: 'Inspiration', icon: '✨' },
];

// 所有链接数据（从链接收集文档获取）
const allLinks = [
  // Software 类别
  {
    _id: '1',
    title: 'Maxon Cinema 4D Official',
    url: 'https://www.maxon.net/zh/cinema-4d',
    description: 'The official website for Maxon Cinema 4D, a powerful 3D modeling and animation software.',
    category: 'software',
    subcategory: 'Official',
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Blender Official',
    url: 'https://www.blender.org/',
    description: 'Blender is a free and open-source 3D computer graphics software tool set used for creating animated films, visual effects, art, 3D models, and more.',
    category: 'software',
    subcategory: 'Official',
    featured: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    title: 'Adobe Substance 3D',
    url: 'https://www.adobe.com/products/substance3d.html',
    description: 'Adobe Substance 3D is a complete suite of tools and assets for 3D design that integrates with Cinema 4D and Blender.',
    category: 'software',
    subcategory: 'Texturing',
    featured: false,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Tutorials 类别
  {
    _id: '4',
    title: 'Greyscalegorilla',
    url: 'https://greyscalegorilla.com/',
    description: 'Tools, training, and textures for professional 3D artists using Cinema 4D, Redshift, Blender, and more.',
    category: 'tutorials',
    subcategory: 'Cinema 4D',
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    title: 'Blender Guru',
    url: 'https://www.youtube.com/@blenderguru',
    description: 'Andrew Price\'s Blender Guru YouTube channel features comprehensive Blender tutorials, including the famous Donut tutorial series.',
    category: 'tutorials',
    subcategory: 'Blender',
    featured: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    title: 'School of Motion',
    url: 'https://www.schoolofmotion.com/',
    description: 'Courses and tutorials for motion design including Cinema 4D training.',
    category: 'tutorials',
    subcategory: 'Motion Graphics',
    featured: false,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Plugins 类别
  {
    _id: '7',
    title: 'X-Particles',
    url: 'https://insydium.ltd/',
    description: 'X-Particles is a plugin for Cinema 4D that provides a complete suite of tools for particle and fluid simulations.',
    category: 'plugins',
    subcategory: 'Cinema 4D',
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '8',
    title: 'Octane Render',
    url: 'https://home.otoy.com/render/octane-render/',
    description: 'OctaneRender is a GPU-based rendering engine that offers stunning visuals for both Cinema 4D and Blender.',
    category: 'plugins',
    subcategory: 'Rendering',
    featured: false,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Assets 类别
  {
    _id: '9',
    title: 'Poly Haven',
    url: 'https://polyhaven.com/',
    description: 'Poly Haven offers free high quality 3D assets for everyone, including HDRIs, textures, and 3D models.',
    category: 'assets',
    subcategory: 'Free',
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '10',
    title: 'CGTrader',
    url: 'https://www.cgtrader.com/free-3d-models/blender',
    description: 'Marketplace for 3D models with a dedicated section for Blender-compatible free models.',
    category: 'assets',
    subcategory: 'Models',
    featured: false,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '11',
    title: 'TurboSquid',
    url: 'https://www.turbosquid.com/',
    description: 'Extensive library of 3D models for professional use, including Cinema 4D and Blender formats.',
    category: 'assets',
    subcategory: 'Models',
    featured: false,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Communities 类别
  {
    _id: '12',
    title: 'Blender Artists Community',
    url: 'https://blenderartists.org/',
    description: 'Blender Artists is an online creative forum that is dedicated to the growth and education of the 3D software Blender.',
    category: 'communities',
    subcategory: 'Blender',
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '13',
    title: 'Reddit r/Cinema4D',
    url: 'https://www.reddit.com/r/Cinema4D/',
    description: 'The Reddit community for Cinema 4D users to share work, ask questions, and discuss the software.',
    category: 'communities',
    subcategory: 'Cinema 4D',
    featured: false,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Inspiration 类别
  {
    _id: '14',
    title: 'ArtStation',
    url: 'https://www.artstation.com/',
    description: 'ArtStation is a showcase platform for artists to display their 3D work and creative portfolios.',
    category: 'inspiration',
    subcategory: 'Portfolio',
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '15',
    title: 'Behance',
    url: 'https://www.behance.net/',
    description: 'Discover and showcase creative work in various fields including 3D design and motion graphics.',
    category: 'inspiration',
    subcategory: 'Portfolio',
    featured: false,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredLinks, setFilteredLinks] = useState(allLinks);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // 3D鼠标特效
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // 筛选链接
  useEffect(() => {
    if (selectedCategory === 'all' && !searchTerm) {
      setFilteredLinks(allLinks);
      return;
    }
    
    const filtered = allLinks.filter(link => {
      const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
      const matchesSearch = !searchTerm || 
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        link.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredLinks(filtered);
  }, [selectedCategory, searchTerm]);
  
  const featuredLinks = allLinks.filter(link => link.featured);

  return (
    <div className="relative overflow-hidden">
      {/* 背景特效 */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>
      <div 
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/20 to-indigo-300/20 blur-3xl -z-10"
        style={{ 
          left: `${mousePosition.x - 192}px`, 
          top: `${mousePosition.y - 192}px`,
          transition: 'transform 0.2s ease-out',
          transform: 'translate3d(0, 0, 0)'
        }}
      ></div>
      
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ultimate Resource Navigation for 3D Designers
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the best tools, tutorials, and resources for Cinema 4D and Blender
          </p>
          
          {/* 搜索栏 */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="Search for resources..."
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* 类别选择器 */}
      <section className="py-10 bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* 特色链接 */}
      {selectedCategory === 'all' && !searchTerm && (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLinks.map((link) => (
                <motion.div
                  key={link._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: parseInt(link._id) * 0.1 }}
                >
                  <LinkCard link={link as any} featured={true} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
      
      {/* 所有链接/筛选结果 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            {selectedCategory === 'all' 
              ? 'All Resources' 
              : `${categories.find(c => c.id === selectedCategory)?.title}`}
          </h2>
          
          {searchTerm && (
            <p className="text-center text-gray-600 mb-8">
              Showing results for "{searchTerm}"
            </p>
          )}
          
          {filteredLinks.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredLinks.map((link) => (
                  <motion.div
                    key={link._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <LinkCard link={link as any} featured={link.featured} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-600">
                Try changing your search or selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA区域 */}
      <section className="py-16 bg-blue-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your 3D Design Skills?</h2>
            <p className="text-xl mb-8">
              Explore our curated collection of resources and take your Cinema 4D and Blender skills to the next level.
            </p>
            <Link 
              href="/about"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Learn More About 3DNAV.TOP
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
