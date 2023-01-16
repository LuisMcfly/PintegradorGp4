import { useEffect, useState } from "react"

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
     isLoading: true,
  })

  const getFetch = async () => {

    const resp = await fetch(url)
    const {data} = await resp.json()

    //console.log('data ', data)
/*   const categories = data.map(prod => ({
    cat: prod.category_id
  })) */

  const getProductsByCategory =  (category_id) => {
    return  data.filter(prod => prod.category_id == category_id)
 }

const categoryOne = getProductsByCategory(1)
const categoryThree = getProductsByCategory(3)

console.log('categorias 1', categoryOne)
console.log('categorias 3', categoryThree)

    setState({
      data,
      isLoading: false,
    })
  }

  useEffect(() => {
    getFetch()
  }, [url])

    return {
      data: state.data,
      isLoading: state.isLoading,
    }

}
