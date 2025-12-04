import { ChevronRight } from 'lucide-react';

interface StockCategory {
  name: string;
  count: number;
}

interface StockNumbersProps {
  categories: StockCategory[];
}

export default function StockNumbers({ categories }: StockNumbersProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Stock numbers</h2>
        <button className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
          VIEW ALL
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 font-medium pb-2 border-b">
          <div>ITEM CATEGORIES</div>
          <div className="text-right">QUANTITY</div>
        </div>
        {categories.map((category, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 py-2">
            <div className="text-sm">{category.name}</div>
            <div className="text-sm text-right text-gray-600">{category.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
