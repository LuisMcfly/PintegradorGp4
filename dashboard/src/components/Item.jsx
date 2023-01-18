import { Product } from "./Product"

export const Item = ({data}) => {
  
  return (
    <div>
      {
          data.map((info) => (
          <Product key={info.id} info={info} />
        ))
      }
    </div>
  )
}
