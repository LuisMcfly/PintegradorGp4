import { Category } from "./Category"
import { AddCategory } from "./AddCategory"
import { useState } from "react"

export const CategoryList = (props) => {
  //aca es donde deboo hacer el fecth a books para poder distribuir a los demas componentes
  const [category, setCategory] = useState({//esto es lo que va mucho antes
    name: ''
})
console.log('fff ', category)
    const prodByCat = (cat) => props.data.filter(prod=> prod.category_id == cat)
    
    const catProd = props.cat.map(ca => ({
      id: ca.id,
      name: ca.name,
      arrXCat: prodByCat(ca.id)
    }))

    return (
        <>
          {
            <div className="row mt-3">
              <div className="col-7">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 >Lista de Categorías</h1>
                  <span>Cantidad de categorías: {catProd.length}</span>
                </div>
                <hr />
                <ul className="list-group">
                  <Category info={catProd} category={category} setCategory={setCategory}/>
                </ul>
              </div>
              <div className="col-5 mt-2">
                <h1>Agregar Categoría</h1>
                <hr />
                <AddCategory category={category} setCategory={setCategory}/>
              </div>
            </div>
          }
        </>
      )
}
