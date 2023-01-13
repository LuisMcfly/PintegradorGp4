import { Product } from "./Product"

export const ProductItem = ({data}) => {
  return (<div>
        {data.map((prod) => (
          <Product key={prod.id} prod={prod} />
        ))}
    </div>
  )
}
