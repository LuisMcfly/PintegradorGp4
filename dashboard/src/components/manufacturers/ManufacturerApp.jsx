import { useContext } from "react";
import { ManufacturerContext } from "../context/ManufacturerContext";
import { Loading } from "../Loading";
import { ManufactureAdd } from "./ManufactureAdd";
import { ManufactureList } from "./ManufactureList";


export const ManufacturerApp = () => {

    const {manufacturers, isLoading } = useContext( ManufacturerContext )
    
    return (
        <div className="container mt-3">
            {
                isLoading 
                ?(
                    <Loading />
                    ):(
                        <div className="row  ">
                            <div className="col-7 ">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>Fabricantes</h1>
                                    <span>Catidad de Fabricantes: {manufacturers.length}</span>
                                </div>
                                <hr />
                                <ManufactureList
                                />
                            </div>

                            <div className="col-5">
                                <h1>Agregar Fabricante</h1>
                                <hr />
                                <ManufactureAdd    
                                />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
