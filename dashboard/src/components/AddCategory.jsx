import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AddCategory = ({category, setCategory}) => {
    
    const onInputChange = ({target}) => {
        setCategory({[target.name]:  target.value})
    }

    const notify = () => toast.success('Categoria agregada con exito!! 🦄', {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
        })

    let {name} = category

    const onSubmit = (e) => {
        e.preventDefault()

        if(!name){
            return
        }
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(category)
            }
            fetch('http://localhost:3000/category/add', requestInit)
                .then(res => res.json())
                .then(console.log)
        
        notify()
        setCategory({name: ''})
    }
 
  return (
    <form onSubmit={onSubmit} >
        <input
            type='text'
            className="form-control"
            placeholder="Escriba el nombre de la categoria"
            name="name"
            onChange={onInputChange}
        />
            <ToastContainer />
        <button
            className="btn btn-outline-primary mt-3"
            type='submit'
            /* onClick={notify} */
            >
            Agregar
        </button>
    </form>
  )
}
