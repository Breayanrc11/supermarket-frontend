import { useEffect, useState } from 'react';
import API from '../../api/api';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  // Obtener productos
  const getProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        await API.delete(`/products/${id}`);
        getProducts();
      } catch (error) {
        console.error('Error eliminando:', error);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

return (
  <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold text-primary mb-4">Productos</h2>

      <Link to="/products/create" className="btn btn-success">
        + Crear producto
      </Link>
    </div>

    <div className="card shadow">
      <div className="card-body">

        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Proveedor</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td className="fw-semibold">{p.name}</td>
                <td>${p.price}</td>
                <td>
                  <span className="badge bg-primary">
                    {p.stock}
                  </span>
                </td>
                <td>{p.Provider?.name || 'Sin proveedor'}</td>

                <td className="text-center">
                  <Link 
                    to={`/products/edit/${p.id}`} 
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  </div>
);
}

export default ProductList;