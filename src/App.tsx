import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

// Layout component that includes the common layout (Sidebar and Header)
function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Placeholder component for other pages
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-full">
    <p className="text-gray-500 text-lg">
      {name} section coming soon
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="products" element={<Placeholder name="Products" />} />
          <Route path="companies" element={<Placeholder name="Companies" />} />
          <Route path="stores" element={<Placeholder name="Stores" />} />
          <Route path="finances" element={<Placeholder name="Finances" />} />
          <Route path="settings" element={<Placeholder name="Settings" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
