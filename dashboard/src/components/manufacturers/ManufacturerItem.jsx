import { useContext } from "react";
import { ManufacturerContext } from "../context/ManufacturerContext";


export const ManufacturerItem = ({manufacturer, productLength}) => {

  const { input, fetchRequests, setInput } = useContext(ManufacturerContext);

  const onUpdateFeature = (id) => {
  
    if(input.name.trim().length == 0) return alert('El campo no puede estar vacio')

    fetchRequests('PUT', input, id)

    alert('Registro actualizado con exito')
    
    setInput({name: ''})
  }

  const onDeleteFeature = (id) => {

  if(productLength >= 1){
    //notifyDanger() 
    alert('U can´t delete a manufacture if it´s associate to one or more products, sry bb!')
    return
  }

  const requestInit = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
  }
  fetch('http://localhost:3000/manufacturer/' + id, requestInit)
      .then(res => res.json())
      .then(console.log)

      //notifyDeleteSuccess()
  //setCategory({name: ''})
}

  return (
    <li className="list-group-item p-2 rounded d-flex justify-content-between mt-2 align-items-center">
      <span>{manufacturer.name}</span>
      <div className="d-flex gap-2">
        <button 
          className="btn btn-outline-danger"
          onClick={ () => onDeleteFeature(manufacturer.id) }
        >Eliminar</button>
        <button 
          className="btn btn-outline-success"
          onClick={ () => onUpdateFeature(manufacturer.id) }
        >Modificar</button>
      </div>
    </li>
  )
}
