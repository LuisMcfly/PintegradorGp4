
export const Product = (props) => {
  //console.log(props.info.feature.name)
  const {id, name, model, category, feature, manufacturer, description, price, discount, stock} = props.info

     return (
    <tbody>
      <tr>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{model}</td>
        <td>{category.name}</td>
        {/* <td>{feature && feature.name}</td> */}
        <td>{manufacturer.name}</td>
        <td>{description}</td>
        <td>$ {price}</td>
        <td>% {discount}</td>
        <td>{stock}</td>
      </tr>
    </tbody>
  )
}
