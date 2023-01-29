
export const FeatureAdd = ({feature, setFeature}) => {

    const onInputChange = ({target}) => {
        setFeature({[target.name]:  target.value})
    }

    let {name} = feature

    const onFormSubmit = (event) => {
        event.preventDefault()

        if(!name || name.trim().length == 0){
         //   notifyAlert()
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(feature)
        }
        fetch('http://localhost:3000/features/addFeature', requestInit)
            .then(res => res.json())
            .then(console.log)
        
            setFeature({name: ''})
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