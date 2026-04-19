import { useState, useEffect } from 'react';
import API from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    providerId: ''
  });

  const [providers, setProviders] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  // Manejar cambios
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Obtener proveedores
  const getProviders = async () => {
    try {
      const res = await API.get('/providers');
      setProviders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener producto si es edición
  const getProduct = async () => {
    try {
      if (id) {
        const res = await API.get(`/products/${id}`);

        setForm({
          ...res.data,
          providerId: res.data.providerId || ''
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Guardar (crear o editar)
  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await API.put(`/products/${id}`, form);
      } else {
        await API.post('/products', form);
      }

      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Error al guardar producto');
    }
  };

  useEffect(() => {
    getProviders();
    getProduct();
  }, []);

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Producto' : 'Crear Producto'}</h2>

      <form onSubmit={saveProduct}>
        <input
          name="name"
          placeholder="Nombre"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Descripción"
          className="form-control mb-2"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Precio"
          type="number"
          className="form-control mb-2"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          placeholder="Stock"
          type="number"
          className="form-control mb-2"
          value={form.stock}
          onChange={handleChange}
        />

        {/* 🔥 SELECT DE PROVEEDORES */}
        <select
          name="providerId"
          className="form-control mb-2"
          value={form.providerId}
          onChange={handleChange}
        >
          <option value="">Seleccione un proveedor</option>

          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - {p.city}
            </option>
          ))}
        </select>

        <button className="btn btn-success">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default ProductForm;