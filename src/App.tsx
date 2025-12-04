import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Products from './pages/Products';
import Companies from './pages/Companies';
import Stores from './pages/Stores';
import Finances from './pages/Finances';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="companies" element={<Companies />} />
          <Route path="stores" element={<Stores />} />
          <Route path="finances" element={<Finances />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
