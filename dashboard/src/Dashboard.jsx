import { LastProductInList, ProductList, Categories } from "./components"
import { Route, Routes, Link } from "react-router-dom"

export const Dashboard = () => {
  return (
    <div>{/* aca va el switch o router */}
      <Link to='/LastProductInList' >Último producto registrado</Link>
      <Link to='/categories' >Categorias</Link>
      <Link to='/productList' >Lista de productos</Link>

  <Routes>
        {/* Panel de detalle de último producto o usuario creado. casi OK*/}
        <Route path="/LastProductInList" component={LastProductInList} />
        {/* <LastProductInList /> */}

        {/* Panel de categorías con el total de productos de cada una.??? no entiendo */}
        <Route path="/categories" component={Categories} />
        {/* <Categories /> */}

        {/* listado de productos casi OK*/}
        <Route path="/productList" component={ProductList} />
        {/* <ProductList /> */}
  </Routes>  
    </div>
  )
}
