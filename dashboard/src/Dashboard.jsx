import { LastProductInList, ProductList, Categories } from "./components";
import { Route, Link, Routes, NavLink, Navigate } from "react-router-dom";
import { User } from "./components/user/User";
import { UserDetail } from "./components/user/UserDetail";
import { FeatureApp } from "./components/features/FeatureApp";
import { ManufacturerApp } from "./components/manufacturers/ManufacturerApp";
import { ManufacturerProvider } from "./components/context/ManufacturerProvider";

export const Dashboard = () => {

  return (
    <ManufacturerProvider>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fs-5">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            Dashboard
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
    </ManufacturerProvider>
  );
};

