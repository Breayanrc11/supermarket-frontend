import { useEffect, useState } from 'react';
import API from '../../api/api';
import { Link } from 'react-router-dom';

function ProviderList() {
  const [providers, setProviders] = useState([]);

  const getProviders = async () => {
    try {
      const res = await API.get('/providers');
      setProviders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProvider = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este proveedor?')) {
      await API.delete(`/providers/${id}`);
      getProviders();
    }
  };

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <div className="container mt-5">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-4">Proveedores</h2>

        <Link to="/providers/create" className="btn btn-success">
          + Crear proveedor
        </Link>
      </div>

      <div className="card shadow rounded-4">
        <div className="card-body">

          <table className="table table-hover align-middle">
            
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Ciudad</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {providers.map(p => (
                <tr key={p.id}>
                  <td>
                    <span className="badge bg-secondary">
                      {p.id}
                    </span>
                  </td>

                  <td className="fw-semibold">{p.name}</td>

                  <td>{p.phone}</td>

                  <td>
                    <span className="text-primary">
                      {p.email}
                    </span>
                  </td>

                  <td>{p.city}</td>

                  <td className="text-center">
                    <Link 
                      to={`/providers/edit/${p.id}`} 
                      className="btn btn-warning btn-sm me-2"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => deleteProvider(p.id)}
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

export default ProviderList;
