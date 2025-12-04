import { ChevronRight } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  location: string;
  itemsCount: number;
  revenue: number;
}

interface StoresListProps {
  stores: Store[];
}

export default function StoresList({ stores }: StoresListProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Stores list</h2>
        <button className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
          VIEW ALL
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left text-xs text-gray-500 font-medium pb-3">STORE NAME</th>
              <th className="text-left text-xs text-gray-500 font-medium pb-3">LOCATION</th>
              <th className="text-right text-xs text-gray-500 font-medium pb-3">ITEMS COUNT</th>
              <th className="text-right text-xs text-gray-500 font-medium pb-3">REVENUE</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="border-b last:border-b-0">
                <td className="py-3 text-sm">{store.name}</td>
                <td className="py-3 text-sm text-gray-600">{store.location}</td>
                <td className="py-3 text-sm text-right text-gray-600">{store.itemsCount} items</td>
                <td className="py-3 text-sm text-right text-gray-600">
                  ${store.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
