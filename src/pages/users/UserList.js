import { useEffect, useState } from 'react';
import API from '../../api/api';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await API.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      await API.delete(`/users/${id}`);
      getUsers();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mt-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-4">Usuarios</h2>

        <Link to="/users/create" className="btn btn-success">
          + Crear usuario
        </Link>
      </div>

      {/* CARD */}
      <div className="card shadow rounded-4">
        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  
                  <td>
                    <span className="badge bg-secondary">
                      {u.id}
                    </span>
                  </td>

                  <td className="fw-semibold">
                    {u.name}
                  </td>

                  <td>
                    <span className="text-primary">
                      {u.email}
                    </span>
                  </td>

                  <td>
                    <span className={`badge ${
                      u.role === 'admin' ? 'bg-danger' : 'bg-info'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="text-center">
                    <Link 
                      to={`/users/edit/${u.id}`} 
                      className="btn btn-warning btn-sm me-2"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => deleteUser(u.id)}
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

export default UserList;