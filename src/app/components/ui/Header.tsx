"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">🧊</span> 3DNAV.TOP
          </Link>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link 
              href="/" 
              className={`hover:text-blue-200 transition ${pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className={`hover:text-blue-200 transition ${pathname.startsWith('/categories') ? 'font-bold' : ''}`}
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className={`hover:text-blue-200 transition ${pathname === '/about' ? 'font-bold' : ''}`}
            >
              About
            </Link>
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`hover:text-blue-200 transition ${pathname.startsWith('/admin') ? 'font-bold' : ''}`}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => signOut()}
                  className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
        
        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 space-y-3 pb-3">
            <Link 
              href="/" 
              className={`block hover:text-blue-200 transition ${pathname === '/' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className={`block hover:text-blue-200 transition ${pathname.startsWith('/categories') ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className={`block hover:text-blue-200 transition ${pathname === '/about' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`block hover:text-blue-200 transition ${pathname.startsWith('/admin') ? 'font-bold' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition mt-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block w-full text-center bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition mt-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
} 