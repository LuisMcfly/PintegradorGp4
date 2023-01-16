import { Loading, ProductItem } from "./"
import { useFetch } from "../hooks/useFetch"


export const ProductList = () => {
   const {data, isLoading} = useFetch("http://localhost:3000/api")
    

  return (
    <>
       {
          isLoading 
          ?(
            <Loading />
          )
          :(
            <ProductItem data={data}/>
          )
       }   
    </>
  )
}
