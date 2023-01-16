
export const Product = ({prod}) => {
  const {name, model, description, price, discount, stock} = prod
  
     return (
    <div>
        <h2>Nombre del producto: {name}</h2>
        <span>Modelo: {model}</span>
        <br />
        <span>Descripción: {description}</span>
        <br />
        <span>Precio: {price}</span>
        <br />
        <span>Descuente: {discount}</span>
        <br />
        <span>Unidades disponibles: {stock}</span>
        <br />
        
    </div>
  )
}
