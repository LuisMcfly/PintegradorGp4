import { LastProductInList, ProductList, Categories } from "./components";
import { Route, Link, Routes, NavLink, Navigate } from "react-router-dom";
import { User } from "./components/user/User";
import { UserDetail } from "./components/user/UserDetail";
import { FeatureApp } from "./components/features/FeatureApp";
import { ManufacturerApp } from "./components/manufacturers/ManufacturerApp";
import { ManufacturerProvider } from "./components/context/ManufacturerProvider";
import { Footer } from "./Footer";
//import './styles.css'
export const Dashboard = () => {

  return (
    <ManufacturerProvider>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fs-5 border border-dark-subtle shadow p-3 bg-body-tertiary rounded">
        <div className="container-fluid">

          <div className="navbar-brand" >
            <h5>Dashboard</h5>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse  navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <NavLink 
               to="/productList"
               className={({isActive})=>`nav-link ${isActive ? 'active' : ''}`}
              >
                Lista de Productos
              </NavLink>
              
              <NavLink 
               to="/LastProductInList"
               className={({isActive})=>`nav-link ${isActive ? 'active' : ''}`}
              >
                Último producto registrado
              </NavLink>

              <NavLink 
               to="/categories"
               className={({isActive})=>`nav-link ${isActive ? 'active' : ''}`}
              >
                Lista de Categorías
              </NavLink>
              
              
              <NavLink 
               to="/variaciones"
               className={({isActive})=>`nav-link ${isActive ? 'active' : ''}`}
              >
                Lista de Variaciones
              </NavLink>
              
              <NavLink 
               to="/fabricantes"
               className={({isActive})=>`nav-link ${isActive ? 'active' : ''}`}
              >
                Lista de Fabricantes
              </NavLink>

              <NavLink 
               to="/usuarios"
               className={({isActive})=>`nav-link ${isActive ? 'active' : ''}`}
              >
                Lista de Usuarios
              </NavLink>
              
              <a 
               href="http://localhost:3000/products/productRegister"
               className=' mx-2 text-secondary nav-link active'
              >
                Crear Producto
              </a>

              <a 
               href="http://localhost:3000/"
               className=' mx-2 text-secondary nav-link'
              >
                Regresar a Pegasus Tech
              </a>
              
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        {/* Panel de detalle de último producto o usuario creado.*/}
        <Route
          path="/LastProductInList"
          element={<LastProductInList />}
        ></Route>

        {/* Panel de categorías con el total de productos de cada una.??? no entiendo */}
        <Route path="/categories" element={<Categories />} />

        {/* lista de productos */}
        <Route path="/productList" element={<ProductList />} />

        {/* Lista de usuarios */}
        <Route path="/usuarios" element={<User />} />

        <Route path="/userDetail/:id" element={<UserDetail />} />

        <Route path="/variaciones/" element={<FeatureApp />} />

        <Route path="/fabricantes/" element={<ManufacturerApp />} />

        <Route path="*" element={<Navigate to='/usuarios' />} /> 
      </Routes>
      <Footer />
    </ManufacturerProvider>
  );
};

