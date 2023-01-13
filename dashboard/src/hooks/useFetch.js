import { useEffect, useState } from "react"


export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
     isLoading: true, 
    /*hasError: null */
  })

  const getFetch = async () => {

    const resp = await fetch(url)
    const {data} = await resp.json()

    /* const products = data.data.map(product => ({
      id: product.id,
      name: product.name,
   })) */
console.log('data---> ', data[data.length - 1])
    setState({
        data,
         isLoading: false,
        /*hasError: null */
    })
  }

  useEffect(() => {
    getFetch()
  }, [url])

    return {
      data: state.data,
      isLoading: state.isLoading,
        /*hasError: state.hasError */
    }

}
