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
          ):(
            <div className="container">
              <div className="mt-3">
                <h1>Lista de Productos</h1><hr />
                <p>Cantidad de productos: {data.length}</p>
              </div>
              <Item data={data} message="Nombre del Producto" />
            </div>
          )
       }   
    </>
  )
}
