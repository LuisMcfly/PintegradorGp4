import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Loading } from "../Loading";
import { FeatureAdd } from "./FeatureAdd";
import { FeatureList } from "./FeatureList";


export const FeatureApp = () => {
const {features, isLoading} = useFetch("http://localhost:3000/api")

const [inputFeature, setInputFeature] = useState({
    name: ''
})
    
    return (
        <div className="container mt-3">
            {
                isLoading 
                ?(
                    <Loading />
                    ):(
                        <div className="row  ">
                            <div className="col-7 ">
                                <h1>Variaciones</h1>
                                <hr />
                                <FeatureList
                                    features={ features } 
                                    feat={inputFeature}
                                    setFeat={setInputFeature}
                                />
                            </div>

                            <div className="col-5">
                                <h1>Agregar Variacion</h1>
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
