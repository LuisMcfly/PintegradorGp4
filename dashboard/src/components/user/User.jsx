import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { Loading } from "../Loading"
import { UserDetail } from "./UserDetail"


export const User = () => {
    const {data, isLoading} = useFetch('http://localhost:3000/userApi')
    
  return (
    <div className="container">
        <h1 className="mt-3">Lista de Usuarios</h1><hr />
    {
        isLoading 
        ?(
            <Loading />
            ):(
                <div className="table-responsive container">
                  <table className="table mt-4">
                      <thead  className="table-dark rounded">
                          <tr>
                              <th scope="col">Cantidad de usuarios: {data.length}</th>
                              <th scope="col">Nombre</th>
                          </tr>
                      </thead>
                    {
                        data.map(user => (
                                <tbody key={user.id}>
                                    <tr>
                                        <th  scope="row">{user.id}</th>
                                        <td className="d-flex justify-content-between">{user.fullName}
                                            <NavLink to={{pathname:`/userDetail/${user.id}`}} className="text-decoration-none" >ver</NavLink>
                                        </td>        
                                    </tr>
                                </tbody>
                            ))
                    }
                  </table>
                </div>
            ) 
        }
    </div>
  )
}
