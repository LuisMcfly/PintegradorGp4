import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFetch } from '../hooks/useFetch';

export const Category = ({info, category}) => {
  const {data} = useFetch("http://localhost:3000/api")
  console.log(data)
  const notifySuccess = () => toast.success('🦄 Categoria modificada con exito!! 🦄', {
    position: "top-center",
    autoClose: 1000,
    theme: "dark",
    })

  const notifyDanger = () => toast.error("Le pedimos que se detenga un momento!", {
    position: "top-center",
    theme: "dark",
  })

  const onUpdate = (id) => {
  /*   if(!category){
        return
    } */
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
        }
        fetch('http://localhost:3000/category/' + id, requestInit)
            .then(res => res.json())
            .then(console.log)

    notifySuccess()
    //setCategory({name: ''})
  }

  
  //si se desea eliminar se puede poner una condición de que elimine todos los productos o que las categorias con productos solo se pueden editar
  const onDelete = (id) => {
    /*   if(!category){
          return
      } */
      const prodByCat = (id) => data.filter(prod => prod.category_id == id)
      console.log('>>> ',prodByCat(id))
      //const asignarCategoriaDefault = info.filter(cat => cat.arrXCat.map(prod => prod.category_id == id))
      //console.log('length ', prodByCat)
      if(prodByCat[0].legth >= 1){
        notifyDanger() 
        return
      }
      //if(asignarCategoriaDefault)console.log('yea')
      //coger los productos y cambiar la categoria

          /* const requestInit = {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(category)
          }
          fetch('http://localhost:3000/category/' + id, requestInit)
              .then(res => res.json())
              .then(console.log) */
  
      //notify()
      //setCategory({name: ''})
    }

  return (
    <>
      {info.map(({ id, name, arrXCat }) => (
          <li key={id} className="list-group-item bg-warning">
            <div className="d-flex justify-content-between text-white bg-dark p-3 rounded">
              <h2>{name}</h2>
              <div className='d-flex gap-2'>
                <button
                  className="btn btn-outline-danger "
                  onClick={() => onDelete(id)}
                  >
                  Eliminar
                  </button>
                <button
                  className="btn btn-outline-success "
                  onClick={() => onUpdate(id)}
                >
                  Modificar
                </button>
              </div>
            </div>
            <div className="mt-3 mb-3">
              Numero de productos por categoria: {arrXCat.length}
            </div>
            <div>
              {arrXCat.map((prod) => (
                <ul key={prod.id} className="list-group">
                  <li className="list-group-item bg-primary mb-1">
                    <h2 className="text-warning">{prod.name}</h2>
                  </li>
                </ul>
              ))}
            </div>
          </li>
      ))}
    </>
  );
};
