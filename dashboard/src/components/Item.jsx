import { Product } from "./Product"

export const Item = ({data}) => {
  
  return (
    <table className="table table-hover table-success table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Modelo</th>
          <th scope="col">Descripción</th>
          <th scope="col">Precio</th>
          <th scope="col">Descuento</th>
          <th scope="col">Stock</th>
        </tr>
      </thead>
    {
      data.map((info) => (
        <Product key={info.id} info={info} />
      ))
    }
    </table >
    
  )
}
