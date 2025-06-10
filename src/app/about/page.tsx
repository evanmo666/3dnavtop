import Link from 'next/link';

export const metadata = {
  title: 'About 3DNAV.TOP - Ultimate Navigation for 3D Designers',
  description: 'Learn about 3DNAV.TOP, the ultimate navigation resource for Cinema 4D and Blender designers.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About 3DNAV.TOP</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-600 mb-8">
            3DNAV.TOP is a curated resource navigation site designed specifically for 3D designers, 
            with a focus on Cinema 4D and Blender users.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
          <p>
            Our mission is to create the ultimate resource hub for 3D designers by collecting, organizing, 
            and presenting the best tools, tutorials, plugins, assets, communities, and inspiration sources 
            in one easy-to-navigate platform.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">Why 3DNAV.TOP?</h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Curated Quality</strong>: We personally review and select each resource to ensure it meets our quality standards.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Time-Saving</strong>: Stop searching through endless search results and start creating with the best tools.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Organized</strong>: Resources are carefully categorized to help you quickly find what you need.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Community-Driven</strong>: We welcome suggestions and continuously update our collection based on community feedback.</span>
              </li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Categories</h2>
          <p>We organize resources into several main categories:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="text-blue-600 mr-2">💻</span> Software
              </h3>
              <p className="text-gray-600">
                Official software resources for Cinema 4D, Blender and companion tools.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="text-blue-600 mr-2">🎓</span> Tutorials
              </h3>
              <p className="text-gray-600">
                Learning resources, courses and training materials for 3D design.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="text-blue-600 mr-2">🧩</span> Plugins
              </h3>
              <p className="text-gray-600">
                Extensions, add-ons and plugins to enhance your 3D workflow.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="text-blue-600 mr-2">🏆</span> Assets
              </h3>
              <p className="text-gray-600">
                3D models, textures, materials and ready-to-use assets.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="text-blue-600 mr-2">👥</span> Communities
              </h3>
              <p className="text-gray-600">
                Forums, discussion groups and communities for 3D designers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="text-blue-600 mr-2">✨</span> Inspiration
              </h3>
              <p className="text-gray-600">
                Galleries, showcases and portfolios to inspire your work.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">Suggest a Resource</h2>
          <p>
            We're always looking to expand our collection with high-quality resources. If you know of a great resource that should be included, please contact us.
          </p>
          
          <div className="bg-gray-100 p-6 rounded-lg my-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Have a suggestion?</h3>
            <p className="mb-4">
              Email us at <a href="mailto:contact@3dnav.top" className="text-blue-600 hover:underline">contact@3dnav.top</a> or use the form on our contact page.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
          </div>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">Behind 3DNAV.TOP</h2>
          <p>
            3DNAV.TOP was created by a team of passionate 3D designers who found themselves constantly bookmarking and sharing useful resources. We decided to build a central hub to organize these resources and share them with the broader community.
          </p>
          <p className="mt-4">
            Our team has combined experience in Cinema 4D, Blender, motion graphics, visual effects, architectural visualization, and product design.
          </p>
        </div>
      </div>
    </div>
  );
} 