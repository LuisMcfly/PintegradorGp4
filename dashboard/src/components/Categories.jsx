import { useFetch } from "../hooks/useFetch"
import { Loading } from "./Loading"
import { ProductItem } from "./ProductItem"

export const Categories = () => {
  const {data, isLoading} = useFetch("http://localhost:3000/api")
  
 
  return (
    <>
      {
          isLoading 
          ?(
            <Loading />
          )
          :(
            <h1>Categories</h1>
          )
       }
    </>
  )
}
