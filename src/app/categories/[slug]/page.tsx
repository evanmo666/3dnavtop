import { LinkCard } from '@/app/components/ui/LinkCard';
import Link from 'next/link';

// 定义类别信息
const categories = {
  software: {
    title: 'Software',
    icon: '💻',
    description: 'Official software resources for Cinema 4D, Blender and companion tools',
  },
  tutorials: {
    title: 'Tutorials',
    icon: '🎓',
    description: 'Learning resources, courses and training materials for 3D design',
  },
  plugins: {
    title: 'Plugins',
    icon: '🧩',
    description: 'Extensions, add-ons and plugins to enhance your 3D workflow',
  },
  assets: {
    title: 'Assets',
    icon: '🏆',
    description: '3D models, textures, materials and ready-to-use assets',
  },
  communities: {
    title: 'Communities',
    icon: '👥',
    description: 'Forums, discussion groups and communities for 3D designers',
  },
  inspiration: {
    title: 'Inspiration',
    icon: '✨',
    description: 'Galleries, showcases and portfolios to inspire your work',
  },
};

// 模拟链接数据
const mockLinks = {
  software: [
    {
      _id: '1',
      title: 'Maxon Cinema 4D Official',
      url: 'https://www.maxon.net/zh/cinema-4d',
      description: 'The official website for Maxon Cinema 4D, a powerful 3D modeling and animation software.',
      category: 'Software',
      subcategory: 'Official',
      icon: 'cinema4d',
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
      category: 'Software',
      subcategory: 'Official',
      icon: 'blender',
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
      category: 'Software',
      subcategory: 'Texturing',
      icon: 'adobe',
      featured: false,
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  tutorials: [
    {
      _id: '4',
      title: 'Greyscalegorilla',
      url: 'https://greyscalegorilla.com/',
      description: 'Tools, training, and textures for professional 3D artists using Cinema 4D, Redshift, Blender, and more.',
      category: 'Tutorials',
      subcategory: 'Cinema 4D',
      icon: 'gsg',
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
      category: 'Tutorials',
      subcategory: 'Blender',
      icon: 'youtube',
      featured: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  plugins: [
    {
      _id: '6',
      title: 'X-Particles',
      url: 'https://insydium.ltd/',
      description: 'X-Particles is a plugin for Cinema 4D that provides a complete suite of tools for particle and fluid simulations.',
      category: 'Plugins',
      subcategory: 'Cinema 4D',
      icon: 'plugin',
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  assets: [
    {
      _id: '7',
      title: 'Poly Haven',
      url: 'https://polyhaven.com/',
      description: 'Poly Haven offers free high quality 3D assets for everyone, including HDRIs, textures, and 3D models.',
      category: 'Assets',
      subcategory: 'Free',
      icon: 'asset',
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  communities: [
    {
      _id: '8',
      title: 'Blender Artists Community',
      url: 'https://blenderartists.org/',
      description: 'Blender Artists is an online creative forum that is dedicated to the growth and education of the 3D software Blender.',
      category: 'Communities',
      subcategory: 'Blender',
      icon: 'community',
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  inspiration: [
    {
      _id: '9',
      title: 'ArtStation',
      url: 'https://www.artstation.com/',
      description: 'ArtStation is a showcase platform for artists to display their 3D work and creative portfolios.',
      category: 'Inspiration',
      subcategory: 'Portfolio',
      icon: 'inspiration',
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
};

// 动态生成页面元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categories[params.slug as keyof typeof categories];
  
  if (!category) {
    return {
      title: 'Category Not Found - 3DNAV.TOP',
      description: 'The requested category was not found.',
    };
  }
  
  return {
    title: `${category.title} Resources - 3DNAV.TOP`,
    description: `Browse the best ${category.title.toLowerCase()} resources for 3D designers - ${category.description}`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const category = categories[slug as keyof typeof categories];
  const links = mockLinks[slug as keyof typeof mockLinks] || [];
  
  // 如果类别不存在，显示404页面
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Category Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The category you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/categories" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Browse All Categories
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Link href="/categories" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Categories
        </Link>
        
        <div className="flex items-center mt-4">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-3xl mr-4">
            {category.icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold">{category.title}</h1>
            <p className="text-xl text-gray-600 mt-2">{category.description}</p>
          </div>
        </div>
      </div>
      
      {links.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link) => (
            <LinkCard key={link._id} link={link as any} featured={link.featured} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">No Resources Found</h2>
          <p className="text-gray-600 mb-6">
            We're still building our collection for this category.
          </p>
          <Link
            href="/categories"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Explore Other Categories
          </Link>
        </div>
      )}
      
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Know a Great {category.title} Resource?</h2>
        <p className="text-lg mb-6">
          Help us improve our collection by suggesting high-quality resources.
        </p>
        <a 
          href="mailto:contact@3dnav.top?subject=Resource Suggestion: {category.title}" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Suggest a Resource
        </a>
      </div>
    </div>
  );
} 