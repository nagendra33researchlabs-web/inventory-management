import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ActivityMetrics from './ActivityMetrics';
import SalesChart from './SalesChart';
import TopCategories from './TopCategories';
import StockNumbers from './StockNumbers';
import StoresList from './StoresList';

interface DashboardData {
  activityMetrics: {
    newItems: number;
    itemsSold: number;
    newUsers: number;
    messages: number;
    reviews: number;
  };
  salesData: Array<{ status: string; count: number }>;
  categories: Array<{ id: string; name: string; iconName: string; itemsCount: number }>;
  stores: Array<{ id: string; name: string; location: string; itemsCount: number; revenue: number }>;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [metricsResult, salesResult, categoriesResult, storesResult] = await Promise.all([
        supabase.from('activity_metrics').select('*').order('created_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('sales_data').select('*').order('status'),
        supabase.from('categories').select('*').limit(6),
        supabase.from('stores').select('*').limit(4),
      ]);

      const metrics = metricsResult.data || {
        new_items: 741,
        items_sold: 123,
        new_users: 12,
        messages: 1,
        reviews: 4,
      };

      setData({
        activityMetrics: {
          newItems: metrics.new_items,
          itemsSold: metrics.items_sold,
          newUsers: metrics.new_users,
          messages: metrics.messages,
          reviews: metrics.reviews,
        },
        salesData: salesResult.data || [],
        categories: (categoriesResult.data || []).map(cat => ({
          id: cat.id,
          name: cat.name,
          iconName: cat.icon_name,
          itemsCount: cat.items_count,
        })),
        stores: (storesResult.data || []).map(store => ({
          id: store.id,
          name: store.name,
          location: store.location,
          itemsCount: store.items_count,
          revenue: store.revenue,
        })),
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  const stockCategories = [
    { name: 'Item categories', count: 16 },
    { name: 'Featured items', count: 28 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <ActivityMetrics metrics={data.activityMetrics} />

      <div className="grid grid-cols-2 gap-6">
        <SalesChart data={data.salesData} />
        <TopCategories categories={data.categories} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StockNumbers categories={stockCategories} />
        <StoresList stores={data.stores} />
      </div>

      <button className="fixed right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
        <ChevronRight size={24} className="text-gray-600" />
      </button>
    </div>
  );
}
