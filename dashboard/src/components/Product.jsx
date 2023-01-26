
export const Product = (props) => {
  const {id, name, model, description, price, discount, stock} = props.info

     return (
    <tbody>
      <tr>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{model}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td>{discount}</td>
        <td>{stock}</td>
      </tr>
    </tbody>
  )
}
