import { useEffect, useState } from "react"

export const useFetch = (url) => {
  const [state, setState] = useState({
    categorys: null,
    data: null,
     isLoading: true,
  })

  const getFetch = async () => {

    const resp = await fetch(url)
    const {data, categorys} = await resp.json()

    setState({
      categorys,
      data,
      isLoading: false,
    })
  }

  useEffect(() => {
    getFetch()
  }, [url])

    return {
      categorys: state.categorys,
      data: state.data,
      isLoading: state.isLoading,
    }

}
