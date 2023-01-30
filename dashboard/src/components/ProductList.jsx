import { Loading, Item } from "./"
import { useFetch } from "../hooks/useFetch"


export const ProductList = () => {
   const {data, isLoading} = useFetch("http://localhost:3000/api")
console.log(data)
   data && data.sort(function (a, b){
    return a.name.localeCompare(b.name, 'en', { numeric: true })
   });
   
  return (
    <>
       {
          isLoading 
          ?(
            <Loading />
          ):(
            <div className="container-fluid p-5 bg-secondary vh-100 mt-5 mb-4 fs-5">
              <div className="mt-3">
                <h1 className="text-light">Lista de Productos</h1><hr />
                <p>Cantidad de productos: {data.length}</p>
              </div>
              <Item data={data} message="Nombre del Producto" />
            </div>
          )
       }   
    </>
  )
}
