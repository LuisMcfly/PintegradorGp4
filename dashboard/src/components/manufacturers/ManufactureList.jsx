import { useContext } from "react";
import { ManufacturerContext } from "../context/ManufacturerContext";
import { ManufacturerItem } from "./ManufacturerItem";


export const ManufactureList = () => {

  const { data, manufacturers } = useContext( ManufacturerContext );

  const prodBymanufacturer = (id) => data.filter(prod => prod.manufacturer_id == id)
    
    const manufacturersProduct = manufacturers.map( ({id, name }) => ({
      id,
      name,
      arrXMan: prodBymanufacturer(id)
    }))


  return (
    <ul className="list-group ">
        {
            manufacturersProduct.map( (manufacturer) => (
              <div className="bg-secondary p-2 rounded" key={ manufacturer.id}>
                <ManufacturerItem 
                  manufacturer={manufacturer}
                  productLength={manufacturer.arrXMan.length}
                  />
                  <div className="mt-2 text-light">
                    Numero de productos por Fabricante: {manufacturer.arrXMan.length}
                  </div>
                  <hr/>
              </div>
            ))
        }
    </ul>
  )
}
