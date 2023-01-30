import { useEffect, useState } from "react"

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    categorys: null,
    features: null,
    manufacturers: null,
     isLoading: true,
  })

  const getFetch = async () => {

    const resp = await fetch(url)
    const { data, categorys, features, manufacturers } = await resp.json()
    //if(data)

    setState({
      ...state,
      data,
      categorys,
      features,
      manufacturers,
      isLoading: false,
    })
  }

  useEffect(() => {
    getFetch()
  }, [url])

    return {
      data: state.data,
      categorys: state.categorys,
      features: state.features,
      manufacturers: state.manufacturers,
      isLoading: state.isLoading,
    }
}
