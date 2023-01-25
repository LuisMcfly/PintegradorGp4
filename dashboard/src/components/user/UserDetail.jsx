import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { Loading } from "../Loading"

export const UserDetail = () => {
    const {data, isLoading} = useFetch('http://localhost:3000/userApi')
    const {id} = useParams()
    
    let user = ''
    if(data){
      user = data.filter(user => user.id == id) 
    } 

    return (
        <>
            {
                isLoading ? (
                    <Loading />
                    ) : (
                         <div className="container mt-3 ">
                            <h2 className="mt-3">Detalle de usuario </h2><hr />
                            <div className="card mt-4">
                                <div className="card-header">
                                    Datos
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item fs-4">Nombre:     {user[0].fullName}      </li>
                                    <li className="list-group-item fs-4">Email:      {user[0].email}         </li>
                                    <li className="list-group-item fs-4">Dirección:  {user[0].addres}        </li>
                                    <li className="list-group-item fs-4">Teléfono:   {user[0].phone}         </li>
                                </ul>
                            </div>
                        </div> 
                    )   
            }
        </>
    )
}
