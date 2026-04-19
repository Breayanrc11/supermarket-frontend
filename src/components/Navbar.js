import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <NavLink className="navbar-brand fw-bold fs-4 text-white" to="/">
          Supermarket
        </NavLink>

        <div>
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Productos</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/providers">Proveedores</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/users">Usuarios</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/sales">Ventas</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;