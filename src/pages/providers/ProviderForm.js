import { useState, useEffect } from 'react';
import API from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

function ProviderForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveProvider = async (e) => {
    e.preventDefault();

    if (id) {
      await API.put(`/providers/${id}`, form);
    } else {
      await API.post('/providers', form);
    }

    navigate('/providers');
  };

  const getProvider = async () => {
    if (id) {
      const res = await API.get(`/providers/${id}`);
      setForm(res.data);
    }
  };

  useEffect(() => {
    getProvider();
  }, []);

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Crear'} Proveedor</h2>

      <form onSubmit={saveProvider}>
        <input name="name" placeholder="Nombre" className="form-control mb-2" value={form.name} onChange={handleChange} />
        <input name="phone" placeholder="Teléfono" className="form-control mb-2" value={form.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" className="form-control mb-2" value={form.email} onChange={handleChange} />
        <input name="city" placeholder="Ciudad" className="form-control mb-2" value={form.city} onChange={handleChange} />

        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}

export default ProviderForm;