import { useState, useEffect } from 'react';
import API from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await API.put(`/users/${id}`, form);
      } else {
        await API.post('/users', form);
      }

      navigate('/users');
    } catch (error) {
      console.error(error);
      alert('Error al guardar usuario');
    }
  };

  const getUser = async () => {
    if (id) {
      const res = await API.get(`/users/${id}`);

      setForm({
        name: res.data.name || '',
        email: res.data.email || '',
        role: res.data.role || 'user'
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Usuario' : 'Crear Usuario'}</h2>

      <form onSubmit={saveUser}>
        <input
          name="name"
          placeholder="Nombre"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
        />

        <select
          name="role"
          className="form-control mb-2"
          value={form.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button className="btn btn-success">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default UserForm;