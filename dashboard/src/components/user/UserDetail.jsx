import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { Loading } from "../Loading"

export const UserDetail = () => {
    const {id} = useParams()
    const {data, isLoading} = useFetch('http://localhost:3000/userApi/' + id)
    const user = data && data
    console.log(user)
    /* if(data){
      user = data.filter(user => user.id == id) 
    }  */

    return (
        <>
            {
                isLoading ? (
                    <Loading />
                    ) : (
                         <div className="container-fluid p-5 bg-secondary text-white bg-opacity-100 vh-100 mt-5">
                            <h1 className="mt-3">Detalle de usuario </h1><hr />
                            <div className="d-flex justify-content-center gap-5">
                                <div className="card mt-4 p-3 bg-dark">
                                    <li className="list-group-item fs-3 text-primary">    {user.name}      </li>
                                </div>
                                    <ul className="list-group p-3 card mt-4 bg-dark rounded list-group-flush">
                                        
                                        <li className="list-group-item fs-4 bg-dark text-light">Email:</li>
                                            <span className="list-group-item px-5 fs-5 bg-dark text-primary" > {user.email} </span>
                                        <li className="list-group-item fs-4 bg-dark text-light">Dirección:          </li>
                                            <span className="list-group-item px-5 fs-5 bg-dark text-primary" > {user.address} </span>
                                        <li className="list-group-item fs-4 bg-dark text-light">Teléfono:            </li>
                                            <span className="list-group-item px-5 fs-5 bg-dark text-primary" > {user.phone} </span>
                                    </ul>
                            </div>
                        </div> 
                    )   
            }
        </>
    )
}
