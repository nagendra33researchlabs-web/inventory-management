import { Home, Package, Building2, Store, DollarSign, Settings, Plus, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type MenuItem = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number | string }>;
};

export default function Sidebar() {
  const menuItems: MenuItem[] = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'companies', name: 'Companies', icon: Building2 },
    { id: 'stores', name: 'Stores', icon: Store },
    { id: 'finances', name: 'Finances', icon: DollarSign },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="rounded-tr-xl w-64 bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 min-h-full flex flex-col text-white">
      <nav className="flex-1 px-3 py-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.id === 'home' ? '/' : `/${item.id}`}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-200 hover:bg-white/10'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 pb-6">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 bg-white/10 hover:bg-white/15 transition-colors">
          <Plus size={20} />
          <span className="text-sm">Add product</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-purple-200 hover:bg-white/10 transition-colors">
          <LogOut size={20} />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
}
