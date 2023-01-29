import { useContext } from "react"
import { useFetch } from "../../hooks/useFetch"
import { ManufacturerContext } from "../context/ManufacturerContext"


export const ManufactureAdd = () => {
  
  const {input, setInput, fetchRequests} = useContext(ManufacturerContext)

  const onInputChange = ({target}) => {
    setInput({[target.name]:  target.value})
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    
    if(input.name.trim().length == 0) return alert('El campo no puede estar vacio')
    
    fetchRequests('POST', input, 'addManufacturer')

    alert('Operación realizada con éxito')
  }


  return (
    <form onSubmit={ onFormSubmit }>
            <input 
                type="text" 
                placeholder="Descripción"
                className="form-control"
                name="name"
                onChange={ onInputChange }
            />

            <button 
                type="submit"
                className="btn btn-outline-primary mt-1"
            >
                Agregar
            </button>
        </form>
  )
}
