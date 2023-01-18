import { useFetch } from "../hooks/useFetch"
import { Loading } from "./Loading"
import { CategoryList } from "./CategoryList"

import '../styles.css'

export const Categories = () => {
  const {categorys, data, isLoading} = useFetch("http://localhost:3000/api")

  return (
    <>
      {
          isLoading 
          ?(
            <Loading />
          )
          :(
            <div className="cats">
              <h1>Categorias</h1>{/* sirve Item pero no product */}
              {
                <CategoryList data={data} cat={categorys} />
              }
            </div>
          )
       }
    </>
  )
}
