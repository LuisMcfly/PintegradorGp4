import { useContext } from "react";
import { ManufacturerContext } from "./context/ManufacturerContext";

export const AddCategory = ({ category, setCategory }) => {
  const { categorys, inputEmpty, addSuccess, sinDiacriticos, alreadyExist } =
    useContext(ManufacturerContext);

  const onInputChange = ({ target }) => {
    setCategory({ [target.name]: target.value });
  };

  let { name } = category;

  const repetidos = categorys?.find(
    (i) =>
      sinDiacriticos(i.name.toLowerCase().trim()) ==
      sinDiacriticos(name.toLowerCase().trim())
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || name.trim().length == 0) {
      inputEmpty();
      return;
    }

    if (repetidos) {
      alreadyExist()
      return;
    }

    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    };
    fetch("http://localhost:3000/category/add", requestInit)
      .then((res) => res.json())
      .then(console.log);

    addSuccess();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control bg-dark text-light"
        placeholder="Escriba el nombre de la categoria"
        name="name"
        onChange={onInputChange}
      />
      <button className="btn btn-outline-dark fs-5 mt-3" type="submit">
        Agregar
      </button>
    </form>
  );
};
