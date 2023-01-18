import { Product } from "./Product"
import '../styles.css'

export const Category = ({info}) => {
    
  console.log('info >> ',  info)
  return (
    <>
      {
        info.map(({id, name, arrXCat}) => (
          <div key={id} className="cats-item">
            <h2>{name}</h2>
            <span>Numero de productos por categoria: {arrXCat.length}</span>
            {
              arrXCat.map(prod => (
                <Product key={prod.id} info={{name: prod.name}} />//
              ))
            }
          </div>
        ))
      }
    </>
  )
}
