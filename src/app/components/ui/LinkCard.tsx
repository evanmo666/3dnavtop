"use client";

import Link from 'next/link';
import { ILink } from '@/app/models/Link';

interface LinkCardProps {
  link: ILink;
  featured?: boolean;
}

export function LinkCard({ link, featured = false }: LinkCardProps) {
  // 根据链接获取网站favicon
  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
      return '/favicon.ico';
    }
  };
  
  return (
    <a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`block p-4 rounded-lg transition transform hover:-translate-y-1 ${
        featured 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-md' 
          : 'bg-white border border-gray-200 hover:shadow'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <img 
            src={getFavicon(link.url)} 
            alt={`${link.title} logo`} 
            className="w-10 h-10 rounded"
            onError={(e) => {
              // 如果图像加载失败，使用备用图标
              (e.target as HTMLImageElement).src = '/favicon.ico';
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-medium truncate ${featured ? 'text-blue-700' : 'text-gray-900'}`}>
            {link.title}
          </h3>
          
          {link.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {link.description}
            </p>
          )}
          
          <div className="mt-2 flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {link.category}
            </span>
            
            {link.subcategory && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {link.subcategory}
              </span>
            )}
            
            {featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
} 