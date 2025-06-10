import { CategoryCard } from '../components/ui/CategoryCard';

export const metadata = {
  title: 'Categories - 3DNAV.TOP',
  description: 'Browse 3D design resources by category - Find the best Cinema 4D and Blender resources organized by type.',
};

// 模拟类别数据
const categories = [
  {
    title: 'Software',
    icon: '💻',
    description: 'Official software resources for Cinema 4D, Blender and companion tools',
    count: 10,
    slug: 'software'
  },
  {
    title: 'Tutorials',
    icon: '🎓',
    description: 'Learning resources, courses and training materials for 3D design',
    count: 24,
    slug: 'tutorials'
  },
  {
    title: 'Plugins',
    icon: '🧩',
    description: 'Extensions, add-ons and plugins to enhance your 3D workflow',
    count: 16,
    slug: 'plugins'
  },
  {
    title: 'Assets',
    icon: '🏆',
    description: '3D models, textures, materials and ready-to-use assets',
    count: 30,
    slug: 'assets'
  },
  {
    title: 'Communities',
    icon: '👥',
    description: 'Forums, discussion groups and communities for 3D designers',
    count: 8,
    slug: 'communities'
  },
  {
    title: 'Inspiration',
    icon: '✨',
    description: 'Galleries, showcases and portfolios to inspire your work',
    count: 12,
    slug: 'inspiration'
  },
  {
    title: 'PBR Materials',
    icon: '🎨',
    description: 'Physically-based rendering materials and textures',
    count: 18,
    slug: 'pbr-materials'
  },
  {
    title: 'HDRIs',
    icon: '🌄',
    description: 'High Dynamic Range Images for lighting your 3D scenes',
    count: 14,
    slug: 'hdri'
  },
  {
    title: 'Tools',
    icon: '🔧',
    description: 'Specialized tools and utilities for 3D designers',
    count: 9,
    slug: 'tools'
  }
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse by Category</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our curated collection of 3D design resources organized by category
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard 
            key={category.slug}
            title={category.title}
            icon={category.icon}
            description={category.description}
            count={category.count}
            slug={category.slug}
          />
        ))}
      </div>
      
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Looking for Something Specific?</h2>
        <p className="text-lg mb-6">
          Can't find what you're looking for? Let us know what resources you need.
        </p>
        <a 
          href="mailto:contact@3dnav.top" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Suggest a Category
        </a>
      </div>
    </div>
  );
} 