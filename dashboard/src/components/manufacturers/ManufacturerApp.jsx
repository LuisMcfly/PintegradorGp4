import { useContext } from "react";
import { ManufacturerContext } from "../context/ManufacturerContext";
import { Loading } from "../Loading";
import { ManufactureAdd } from "./ManufactureAdd";
import { ManufactureList } from "./ManufactureList";


export const ManufacturerApp = () => {

    const {manufacturers, isLoading } = useContext( ManufacturerContext )
    
    manufacturers && manufacturers.sort(function (a, b){
        return a.name.localeCompare(b.name, 'en', { numeric: true })
    }); 

    return (
        <div className="container-fluid mt-5 p-5 bg-secondary">
            {
                isLoading 
                ?(
                    <Loading />
                    ):(
                        <div className="row vh-100">
                            <div className="col-7 ">
                                <div className="d-flex  text-light justify-content-between align-items-center">
                                    <h1>Fabricantes</h1>
                                    <span>Catidad de Fabricantes: {manufacturers.length}</span>
                                </div>
                                <hr />
                                <ManufactureList
                                />
                            </div>

                            <div className="col-5 mt-2">
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
