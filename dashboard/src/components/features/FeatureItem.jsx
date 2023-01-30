import { useContext } from "react";
import { ManufacturerContext } from "../context/ManufacturerContext";

export const FeatureItem = (props) => {
  const { updateSeccess, opDenied, deleteOption, inputEmpty} = useContext(ManufacturerContext);

let name = props.feat.name

  const onUpdateFeature = (id) => {
      if(name.trim().length == 0){
        inputEmpty()
          return
      }
          const requestInit = {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(props.feat)
          }
          fetch('http://localhost:3000/features/' + id, requestInit)
              .then(res => res.json())
              .then(console.log)
          
      updateSeccess()
    }

    const onDeleteFeature = (id) => {

      if(props.productLength >= 1){
        opDenied()
        return
      }
    
      const requestInit = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
      }
      fetch('http://localhost:3000/features/' + id, requestInit)
          .then(res => res.json())
          .then(console.log)
    
      deleteOption()
    }
  
  return (
    <li className="list-group-item d-flex justify-content-between mt-2 align-items-center p-2 rounded bg-dark text-light fs-4">
      <span>{props.feature.name}</span>
      <div className="d-flex gap-2">
        <button 
          className="btn btn-outline-danger"
          onClick={ () => onDeleteFeature( props.feature.id ) }
        >Eliminar</button>
        <button 
          className="btn btn-outline-success"
          onClick={ () => onUpdateFeature( props.feature.id ) }
        >Modificar</button>
      </div>
    </li>
  )
}