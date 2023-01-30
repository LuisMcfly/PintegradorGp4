import { useContext } from "react"
import { ManufacturerContext } from "../context/ManufacturerContext"
import { FeatureItem } from "./FeatureItem"

export const FeatureList = ({ features, feat }) => {
  const {data} = useContext(ManufacturerContext)

  const prodByFeatures = (id) => data && data.filter(prod => prod.features_id == id) 
    
    const featureProduct = features.map( ({id, name }) => ({
      id,
      name,
      arrXFeat: data && prodByFeatures(id)
    }))

  return (
    <ul className="list-group bg-secondary p-2">
        {
            featureProduct.map( feature => (
              <div key={feature.id}>
                <FeatureItem 
                  key={ feature.id } 
                  feature={ feature }
                  feat={feat} 
                  productLength={data && feature.arrXFeat.length}
                />
                <div className="mt-2 text-light">
                    Numero de productos con esta Variación: {data && feature.arrXFeat.length}
                </div>
              </div>
            ))
        }
    </ul>
  )
}