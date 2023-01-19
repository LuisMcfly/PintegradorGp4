import { Loading, Item } from "./"
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
            <Item data={data} message="Nombre del Producto"/>
          )
       }   
    </>
  )
}
