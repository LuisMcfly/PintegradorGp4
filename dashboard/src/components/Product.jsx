
export const Product = (props) => {
  const {name, model, description, price, discount, stock} = props.info


     return (
      <li>
        {
          name && <h2> {name}</h2>
        }
        {
          model && <span>Modelo: {model}</span>
        }
          {/* <br /> */}
        {
          description && <span>Descripción: {description}</span>
        }
          {/* <br /> */}
        {
          price && <span>Precio: {price}</span>
        }
          {/* <br /> */}
        {
          discount && <span>Descuente: {discount}</span>
        }
        {/*  <br /> */}
        {
          stock && <span>Unidades disponibles: {stock}</span>
        }
          {/* <br /> */}
    </li>
  )
}
