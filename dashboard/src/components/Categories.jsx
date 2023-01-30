import { useFetch } from "../hooks/useFetch"
import { Loading } from "./Loading"
import { CategoryList } from "./CategoryList"

//import '../styles.css'

export const Categories = () => {
  const {categorys, data, isLoading} = useFetch("http://localhost:3000/api")

  categorys && categorys.sort(function (a, b){
    return a.name.localeCompare(b.name, 'en', { numeric: true })
  });

  return (
    <>
      
      {
          isLoading 
          ?(
            <Loading />
          )
          :(
            <div className="container-fluid mt-5 p-5 bg-secondary">
              {
                <CategoryList data={data} cat={categorys} />
              }
            </div>
          )
       }
    </>
  )
}
