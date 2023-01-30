import { NavLink } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { Loading } from "../Loading"

export const User = () => {
    const { data, isLoading } = useFetch('http://localhost:3000/userApi')
    console.log(data)
    // data && data.sort(function (a, b){
    //     // return a.name.localeCompare(b.name, 'en', { numeric: true })
    // });

    return (
        <div className="container-fluid bg-secondary text-white bg-opacity-100 p-3 vh-100 mt-5">
            <h1 className=" text-white p-5 ">Lista de Usuarios</h1><hr />
            {
                isLoading
                    ? (
                        <Loading />
                    ) : (
                        <div className="table-responsive container ">
                            <table className="table mt-4 ">
                                <thead className="table-dark fs-5">
                                    <tr>
                                        <th scope="col">Cantidad de usuarios: {data.length}</th>
                                        <th scope="col">Nombre</th>
                                    </tr>
                                </thead>
                                {
                                    data.map(user => (
                                        <tbody className="fs-5" key={user.id}>
                                            <tr>
                                                <th scope="row">{user.id}</th>
                                                <td className="d-flex text-white justify-content-between">{user.fullName}
                                                    <NavLink to={{ pathname: `/userDetail/${user.id}` }} className="text-decoration-none text-light" >ver detalle</NavLink>
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
