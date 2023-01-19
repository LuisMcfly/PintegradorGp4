import { LastProductInList, ProductList, Categories } from "./components"
import { Route, Link, Routes } from "react-router-dom"

export const Dashboard = () => {
  return (
    <div>{/* aca va el switch o router */}
      <ul>
        <li>
          <Link to='/LastProductInList' >Último producto registrado</Link>
        </li>
        <li>
          <Link to='/categories' >Categorias</Link>
        </li>
        <li>
          <Link to='/productList' >Lista de productos</Link>
        </li>
      </ul>

  <Routes>
        {/* Panel de detalle de último producto o usuario creado. casi OK*/}
        <Route path="/LastProductInList" element={<LastProductInList />} ></Route>

        {/* Panel de categorías con el total de productos de cada una.??? no entiendo */}
        <Route path="/categories" element={<Categories />} />

        {/* listado de productos casi OK*/}
        <Route path="/productList" element={<ProductList />} />
  </Routes>  
    </div>
  )
}
