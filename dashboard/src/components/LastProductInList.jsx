import { useFetch } from "../hooks/useFetch"
import { Loading, Product } from "./"

export const LastProductInList = () => {
    const {data, isLoading} = useFetch("http://localhost:3000/api")
    
  return (
    <>
        <h1 className="mt-3 container ">Último producto en lista</h1><hr />
        <table className="table table-hover table-danger table-striped container mt-5">
          <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Modelo</th>
                <th scope="col">Categoría</th>
                <th scope="col">Variaciones</th>
                <th scope="col">Fabricante</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Descuento</th>
                <th scope="col">Stock</th>
            </tr>
          </thead>
            {
                isLoading
                    ?(
                        <Loading />
                    )
                    :(
                        <Product info={data[data.length - 1]}/>
                    )
            }
        </table>
    </>
  )
}
