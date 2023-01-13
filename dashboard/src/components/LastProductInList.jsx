import { useFetch } from "../hooks/useFetch"
import { Loading, Product } from "./"


export const LastProductInList = () => {
    const {data, isLoading} = useFetch("http://localhost:3000/api")
    /*  */

  return (
    <>
        {
            isLoading
                ?(
                    <Loading />
                )
                :(
                    <Product prod={data[data.length - 1]}/>
                )
        }
    </>
  )
}
