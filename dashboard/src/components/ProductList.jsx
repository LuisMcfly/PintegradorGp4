import { useState } from "react"
import { Loading, ProductItem } from "./"
import { useFetch } from "../hooks/useFetch"


export const ProductList = () => {
   const {data, isLoading, hasError} = useFetch("http://localhost:3000/api")
    

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
