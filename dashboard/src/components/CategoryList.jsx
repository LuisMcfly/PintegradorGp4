import { Category } from "./Category";
import { AddCategory } from "./AddCategory";
import { useState } from "react";

export const CategoryList = (props) => {
  const [category, setCategory] = useState({
    name: "",
  });

  const prodByCat = (cat) =>
    props.data.filter((prod) => prod.category_id == cat);

  const catProd = props.cat.map((ca) => ({
    id: ca.id,
    name: ca.name,
    arrXCat: prodByCat(ca.id),
  }));

  return (
    <>
      {
        <div className="row mt-3 mb-5">
          <div className="col-7">
            <div className="d-flex text-light justify-content-between align-items-center">
              <h1>Categorías</h1>
              <span>Cantidad de categorías: {catProd.length}</span>
            </div>
            <hr />
            <ul className="list-group">
              <Category
                info={catProd}
                category={category}
                setCategory={setCategory}
              />
            </ul>
          </div>
          <div className="col-5 mt-2">
            <h1>Agregar Categoría</h1>
            <hr />
            <AddCategory category={category} setCategory={setCategory} />
          </div>
        </div>
      }
    </>
  );
};
