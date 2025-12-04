import { ChevronRight } from 'lucide-react';

interface SalesData {
  status: string;
  count: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export default function SalesChart({ data }: SalesChartProps) {
  const maxValue = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Sales</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-end justify-between h-48 gap-8 px-4">
        {data.map((item, index) => {
          const height = (item.count / maxValue) * 100;
          // const isPrimary = item.status === 'Shipped';

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center" style={{ height: '160px' }}>
                <div
                  className={`w-[10%] rounded-t-lg transition-all ${
                    item.status === 'Shipped' ? 'bg-purple-800' :
                    item.status === 'Picked' ? 'bg-purple-500' :
                    item.status === 'Confirmed' ? 'bg-purple-400' : 'bg-purple-200'
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 text-center">{item.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
