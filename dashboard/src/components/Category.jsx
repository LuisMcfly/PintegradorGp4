import { useFetch } from "../hooks/useFetch";
import { useContext } from "react";
import { ManufacturerContext } from "./context/ManufacturerContext";

export const Category = ({ info, category }) => {
  //const { data } = useFetch("http://localhost:3000/api");

  const { data, inputEmpty, categorys, opDenied, updateSeccess, deleteOption, sinDiacriticos  } =
    useContext(ManufacturerContext);

    const repetidos = categorys?.find(i => sinDiacriticos(i.name.toLowerCase().trim()) == sinDiacriticos(category.name .toLowerCase().trim()))

  const onUpdate = (id) => {
    if (!category.name || category.name.trim().length == 0) {
      inputEmpty();
      return;
    }

   /*  if(repetidos){
      alert('Ya existe')
      return
  } */


    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    };
    fetch("http://localhost:3000/category/" + id, requestInit)
      .then((res) => res.json())
      .then(console.log);

    updateSeccess();
  };

  const onDelete = (id) => {
    if (!category) return; //que no llegue un valor null

    const prodByCat = data.filter((prod) => prod.category_id == id);

    if (prodByCat.length >= 1) {
      opDenied();
      return;
    }

    const requestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    };
    fetch("http://localhost:3000/category/" + id, requestInit)
      .then((res) => res.json())
      .then(console.log);

    deleteOption();
  };

  return (
    <>
      {info.map(({ id, name, arrXCat }) => (
        <li key={id} className="list-group-item bg-secondary">
          <div className="d-flex justify-content-between text-white bg-dark p-2 rounded">
            <h2>{name}</h2>
            <div className="d-flex gap-2">
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
          <div className="mt-3 mb-3 text-light">
            Numero de productos por categoria: {arrXCat.length}
          </div>
          <div>
            {arrXCat.map((prod) => (
              <ul key={prod.id} className="list-group">
                <li className="list-group-item bg-secondary mb-1">
                  <h2 className="text-dark">
                    {prod.id}. {prod.name}
                  </h2>
                </li>
              </ul>
            ))}
          </div>
        </li>
      ))}
    </>
  );
};
