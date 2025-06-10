export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">3DNAV.TOP</h3>
            <p className="text-gray-300">
              The ultimate navigation site for 3D designers, providing curated resources for Cinema 4D and Blender users.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/categories" className="text-gray-300 hover:text-white transition">Categories</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition">About</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-gray-300 mb-2">
              Have a suggestion? Contact us or submit your link.
            </p>
            <a 
              href="mailto:contact@3dnav.top" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} 3DNAV.TOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 