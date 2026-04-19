import { useEffect, useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

function SaleForm() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [userId, setUserId] = useState('');
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  // Obtener usuarios
  const getUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data);
  };

  // Obtener productos
  const getProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  useEffect(() => {
    getUsers();
    getProducts();
  }, []);

  // Agregar producto a la lista
  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1 }]);
  };

  // Cambiar valores
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Eliminar item
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Calcular total
  const calculateTotal = () => {
    let total = 0;

    items.forEach(item => {
      const product = products.find(p => p.id == item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    });

    return total;
  };

  // Guardar venta
  const saveSale = async (e) => {
    e.preventDefault();

    try {
      await API.post('/sales', {
        userId,
        products: items
      });

      alert('Venta creada correctamente');
      navigate('/sales');
    } catch (error) {
      console.error(error);
      alert('Error al crear venta');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Venta</h2>

      <form onSubmit={saveSale}>

        {/* Usuario */}
        <select
          className="form-control mb-3"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Seleccione usuario</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Productos */}
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addItem}
        >
          Agregar producto
        </button>

        {items.map((item, index) => (
          <div key={index} className="row mb-2">
            
            <div className="col">
              <select
                className="form-control"
                value={item.productId}
                onChange={(e) =>
                  handleItemChange(index, 'productId', e.target.value)
                }
              >
                <option value="">Producto</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} - ${p.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <input
                type="number"
                className="form-control"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, 'quantity', e.target.value)
                }
              />
            </div>

            <div className="col">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeItem(index)}
              >
                X
              </button>
            </div>

          </div>
        ))}

        {/* Total */}
        <h4>Total: ${calculateTotal()}</h4>

        <button className="btn btn-success mt-3">
          Guardar Venta
        </button>
      </form>
    </div>
  );
}

export default SaleForm;