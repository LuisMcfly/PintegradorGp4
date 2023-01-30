import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Loading } from "../Loading";
import { FeatureAdd } from "./FeatureAdd";
import { FeatureList } from "./FeatureList";


export const FeatureApp = () => {
const {features, isLoading} = useFetch("http://localhost:3000/api")
console.log('---> ',features)
features && features.sort(function (a, b){
    return a.name.localeCompare(b.name, 'en', { numeric: true })
  });

const [inputFeature, setInputFeature] = useState({
    name: ''
})
    
    return (
        <div className=" container-fluid mt-5 p-5 bg-secondary">
            {
                isLoading 
                ?(
                    <Loading />
                    ):(
                        <div className="row  ">
                            <div className="col-7 ">
                                <div className="d-flex text-light justify-content-between align-items-center">
                                    <h1>Variaciones</h1>
                                    <span>Catidad de Variaciones: {features.length}</span>
                                </div>
                                <hr />
                                <FeatureList
                                    features={ features } 
                                    feat={inputFeature}
                                    setFeat={setInputFeature}
                                />
                            </div>

                            <div className="col-5 mt-2">
                                <h1>Agregar Variación</h1>
                                <hr />
                                <FeatureAdd 
                                    features={ features } 
                                    feature={inputFeature}
                                    setFeature={setInputFeature}    
                                />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
