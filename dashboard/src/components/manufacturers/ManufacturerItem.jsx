import { useContext } from "react";
import { ManufacturerContext } from "../context/ManufacturerContext";

export const ManufacturerItem = ({ manufacturer, productLength }) => {
  const { input, fetchRequests, updateSeccess, opDenied, deleteOption, inputEmpty } = useContext( ManufacturerContext );

  const onUpdateFeature = (id) => {
    if (input.name.trim().length == 0){
      inputEmpty()
      return
    }
      

    fetchRequests("PUT", input, id);

    updateSeccess()
  };

  const onDeleteFeature = (id) => {
    if (productLength >= 1) {
      opDenied()
      return;
    }

    const requestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3000/manufacturer/" + id, requestInit)
      .then((res) => res.json())
      .then(console.log);

      deleteOption()
  };

  return (
    <li className="list-group-item p-2 fs-2 bg-dark text-light  rounded d-flex justify-content-between mt-1 align-items-center">
      <span>{manufacturer.name}</span>
      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-danger"
          onClick={() => onDeleteFeature(manufacturer.id)}
        >
          Eliminar
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => onUpdateFeature(manufacturer.id)}
        >
          Modificar
        </button>
      </div>
    </li>
  );
};
