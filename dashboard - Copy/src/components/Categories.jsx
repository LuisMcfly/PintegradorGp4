import { useFetch } from "../hooks/useFetch"
import { Loading } from "./Loading"
import { CategoryList } from "./CategoryList"

//import '../styles.css'

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
            <div className="container">
              {
                <CategoryList data={data} cat={categorys} />
              }
            </div>
          )
       }
    </>
  )
}
