import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProductList from './pages/products/ProductList';
import ProductForm from './pages/products/ProductForm';
import ProviderList from './pages/providers/ProviderList';
import ProviderForm from './pages/providers/ProviderForm';
import UserList from './pages/users/UserList';
import UserForm from './pages/users/UserForm';
import SaleForm from './pages/sales/SaleForm';
import SaleList from './pages/sales/SaleList';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
        <Route path="/providers" element={<ProviderList />} />
        <Route path="/providers/create" element={<ProviderForm />} />
        <Route path="/providers/edit/:id" element={<ProviderForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/sales/create" element={<SaleForm />} />
        <Route path="/sales" element={<SaleList />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;