import { useContext } from "react";
import { ManufacturerContext } from "../context/ManufacturerContext";

export const FeatureAdd = ({ feature, setFeature }) => {
  const {features, addSuccess, inputEmpty, sinDiacriticos, alreadyExist } = useContext(ManufacturerContext);

  const onInputChange = ({ target }) => {
    setFeature({ [target.name]: target.value });
  };

  let { name } = feature;

  const repetidos = features?.find(i => sinDiacriticos(i.name.toLowerCase().trim()) == sinDiacriticos(name.toLowerCase().trim()))

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!name || name.trim().length == 0) {
      inputEmpty();
      return;
    }

    if(repetidos){
      alreadyExist()
      return
  }

    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feature),
    };
    fetch("http://localhost:3000/features/addFeature", requestInit)
      .then((res) => res.json())
      .then(console.log);

    addSuccess();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Descripción"
        className="form-control bg-dark text-light"
        name="name"
        onChange={onInputChange}
      />

      <button type="submit" className="btn btn-outline-dark fs-5 mt-3 ">
        Agregar
      </button>
    </form>
  );
};
