import { Category } from "./Category"

import '../styles.css'

export const CategoryList = (props) => {

  const prodByCat = (cat) => props.data.filter(prod=> prod.category_id == cat)
  const catProd = props.cat.map(ca => ({
    id: ca.id,
    name: ca.name,
    arrXCat: prodByCat(ca.id)
  }))

    return (
        <div>
          {
              catProd.map((info, i) => (
             <Category key={info + i} info={catProd}/>
            ))
          }
        </div>
      )
}
