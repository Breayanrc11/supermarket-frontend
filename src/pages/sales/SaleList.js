import { useEffect, useState } from 'react';
import API from '../../api/api';
import { Link } from 'react-router-dom';

function SaleList() {
  const [sales, setSales] = useState([]);
  const [openId, setOpenId] = useState(null);

  const getSales = async () => {
    try {
      const res = await API.get('/sales');
      setSales(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="container mt-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-4">Ventas</h2>

        <Link to="/sales/create" className="btn btn-success">
          + Crear venta
        </Link>
      </div>

      {/* CARD */}
      <div className="card shadow rounded-4">
        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Total</th>
                <th className="text-center">Detalle</th>
              </tr>
            </thead>

            <tbody>
              {sales.map(s => (
                <>
                  {/* FILA PRINCIPAL */}
                  <tr key={s.id}>
                    <td>
                      <span className="badge bg-secondary">
                        {s.id}
                      </span>
                    </td>

                    <td className="fw-semibold">
                      {s.User?.name}
                    </td>

                    <td>
                      <span className="badge bg-success">
                        ${s.total}
                      </span>
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => setOpenId(openId === s.id ? null : s.id)}
                      >
                        {openId === s.id ? 'Ocultar' : 'Ver detalle'}
                      </button>
                    </td>
                  </tr>

                  {/* DETALLE EXPANDIBLE */}
                  {openId === s.id && (
                    <tr>
                      <td colSpan="4">
                        <div className="p-3 bg-light rounded">

                          <h6 className="fw-bold mb-3">
                            Detalle de la venta
                          </h6>

                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>

                            <tbody>
                              {s.Details?.map((d, i) => (
                                <tr key={i}>
                                  <td>{d.Product?.name}</td>
                                  <td>{d.quantity}</td>
                                  <td>${d.price}</td>
                                  <td>
                                    <strong>
                                      ${d.price * d.quantity}
                                    </strong>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default SaleList;
