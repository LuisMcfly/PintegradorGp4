export const FeatureItem = (props) => {

let name = props.feat.name

  const onUpdateFeature = (id) => {
      if(name.trim().length == 0){
        alert('El campo no puede estar vacío')
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
  
      //notifySuccess()
      //setCategory({name: ''})
    }

    const onDeleteFeature = (id) => {

      if(props.productLength >= 1){
        //notifyDanger() 
        alert('U can´t delete a feature if it is associate to one or more products, sry bb!')
        return
      }
    
      const requestInit = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
      }
      fetch('http://localhost:3000/features/' + id, requestInit)
          .then(res => res.json())
          .then(console.log)
    
          //notifyDeleteSuccess()
      //setCategory({name: ''})
    }
  
  return (
    <li className="list-group-item d-flex justify-content-between mt-2 align-items-center bg-warning">
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