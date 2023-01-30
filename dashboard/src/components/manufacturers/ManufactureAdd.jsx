import { useContext } from "react"
import { ManufacturerContext } from "../context/ManufacturerContext"

export const ManufactureAdd = () => {
  
  const { manufacturers, input, setInput, fetchRequests, addSuccess, inputEmpty, sinDiacriticos, alreadyExist } = useContext( ManufacturerContext )

  const onInputChange = ({target}) => {
    setInput({[target.name]:  target.value})
  }
  
  const repetidos = manufacturers?.find(i => sinDiacriticos(i.name.toLowerCase().trim()) == sinDiacriticos(input.name.toLowerCase().trim()))

  const onFormSubmit = (event) => {
    event.preventDefault()
    
    if(input.name.trim().length == 0){
      inputEmpty() 
      return 
    } 

    if(repetidos){
      alreadyExist()
      return
  }
    
    fetchRequests('POST', input, 'addManufacturer')

    addSuccess()
  } 


  return (
    <form onSubmit={ onFormSubmit }>
            <input 
                type="text" 
                placeholder="Descripción"
                className="form-control bg-dark text-light"
                name="name"
                onChange={ onInputChange }
            />

            <button 
                type="submit"
                className="btn btn-outline-dark fs-5 mt-3"
            >
                Agregar
            </button>
        </form>
  )
}
