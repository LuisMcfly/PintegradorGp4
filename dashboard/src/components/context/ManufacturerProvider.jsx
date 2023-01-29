import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import { ManufacturerContext } from "./ManufacturerContext"


export const ManufacturerProvider = ({children}) => {
    
const {data, manufacturers, isLoading} = useFetch("http://localhost:3000/api")

const [input, setInput] = useState({
    name: ''
})

const fetchRequests = (method, bodyValue, petiteUrl) => {
    const requestInit = {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(bodyValue)
    }
    fetch("http://localhost:3000/manufacturer/" + petiteUrl , requestInit )    //addManufacturer
      .then(res => res.json())
      .then(console.log)
  }
    
  return (
    < ManufacturerContext.Provider value={{ isLoading, data, manufacturers, input, setInput, fetchRequests }} >
        { children }
    </ ManufacturerContext.Provider>
  )
}
