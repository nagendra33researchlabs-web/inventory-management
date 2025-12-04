import { ChevronRight, Shirt, Smartphone, Home, Bike, Book, Baby } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  iconName: string;
  itemsCount: number;
}

interface TopCategoriesProps {
  categories: Category[];
}

export default function TopCategories({ categories }: TopCategoriesProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: typeof Shirt } = {
      shirt: Shirt,
      smartphone: Smartphone,
      home: Home,
      bike: Bike,
      book: Book,
      baby: Baby,
    };
    return icons[iconName] || Shirt;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Top item categories</h2>
        <button className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
          VIEW ALL
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 px-[22%]">
        {categories.map((category) => {
          const Icon = getIcon(category.iconName);
          return (
            <div
              key={category.id}
              className="h-[100px] w-[100px] bg-[#e4d2fb] rounded-lg flex items-center justify-center cursor-pointer"
            >
              <Icon size={32} className="text-[#5000a1]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
