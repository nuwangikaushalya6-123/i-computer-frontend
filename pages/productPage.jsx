import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../src/components/productCard"
import LoadingAnimation from "../src/components/loadingAnimation"
import toast from "react-hot-toast"


export default function productPage(){
    const [products, setProducts] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(
        ()=>{
          // fetch product database
          if(loading){
            axios.get(import.meta.env.VITE_API_URL + "/products")
            .then(
                (response)=>{
                    setProducts(response.data)
                    setLoading(false)
                }
            ).catch(
                ()=>{
                    toast.error("failed to feach products. please try again.")
                    setLoading(false)
                }
            )
          }
        },[loading]
    )
    return(
      
  
  <div className="flex flex-wrap justify-center gap-4 ">
    {loading && <LoadingAnimation />}

    {!loading && products.map(item => (
      <ProductCard product={item} key={item.productId} />
    ))}
  </div>
)

    
}