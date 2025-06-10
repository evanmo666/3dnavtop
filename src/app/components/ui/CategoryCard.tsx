import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  icon: string;
  description: string;
  count: number;
  slug: string;
}

export function CategoryCard({ title, icon, description, count, slug }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${slug}`}
      className="block p-6 rounded-xl bg-white border border-gray-200 shadow-sm transition hover:shadow-md hover:border-blue-200"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-xl">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{count} links</span>
        <span className="text-blue-600 text-sm font-medium">Browse &rarr;</span>
      </div>
    </Link>
  );
} 