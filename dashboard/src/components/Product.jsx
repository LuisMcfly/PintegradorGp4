
export const Product = ({prod}) => {
  return (
    <div>
        <h2>Nombre del producto: {prod.name}</h2>
        <span>Modelo: {prod.model}</span>
        <br />
        <span>Descripción: {prod.description}</span>
        <br />
        <span>Precio: {prod.price}</span>
        <br />
        <span>Descuente: {prod.discount}</span>
        <br />
        <span>Unidades disponibles: {prod.stock}</span>
        <br />
        
    </div>
  )
}
