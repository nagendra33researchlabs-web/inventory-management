import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metric {
  value: number;
  label: string;
  change: number;
}

interface ActivityMetricsProps {
  metrics: {
    newItems: number;
    itemsSold: number;
    newUsers: number;
    messages: number;
    reviews: number;
  };
}

export default function ActivityMetrics({ metrics }: ActivityMetricsProps) {
  const metricsList: Metric[] = [
    { value: metrics.newItems, label: 'NEW ITEMS', change: 12 },
    { value: metrics.itemsSold, label: 'ITEMS SOLD', change: 8 },
    { value: metrics.newUsers, label: 'NEW USERS', change: -3 },
    { value: metrics.messages, label: 'MESSAGE', change: 0 },
    { value: metrics.reviews, label: 'REVIEWS', change: 5 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">Recent activity</h2>
      <div className="grid grid-cols-5 gap-6">
        {metricsList.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold mb-1 text-purple-900">{metric.value}</div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {metric.change > 0 && (
                <>
                  <TrendingUp size={14} className="text-purple-600" />
                  <span className="text-xs text-purple-600">{metric.change}%</span>
                </>
              )}
              {metric.change < 0 && (
                <>
                  <TrendingDown size={14} className="text-red-500" />
                  <span className="text-xs text-red-500">{Math.abs(metric.change)}%</span>
                </>
              )}
              {metric.change === 0 && <span className="text-xs text-gray-400">0%</span>}
            </div>
            <div className="text-xs text-gray-500 uppercase">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
