import {  useState } from "react"
import {  getCartTotal } from "../src/cart"
import { BiMinus, BiPlus } from "react-icons/bi"
import getFormatPrice from "../src/utils/price-format"
import { useLocation, useNavigate } from "react-router-dom"

import CheckOutDetailsModel from "../src/components/checkoutDetailsModel"


export default function Checkout() {
    const location = useLocation();
    const [cart , setCart] = useState(location.state || [])
    const [firstName , setFirstName] = useState("")
    const [lasttName , setLastName] = useState("")
    
    
    const navigate = useNavigate();
     
    if(location.state == null){
        navigate("/products")
    }

    

    

    return (
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll">


           <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
            
            {
            cart.map((cartItem , index)=>{
                 
                return(
                    <div key={index} className="w-[600px] h-[150px] gap-4 bg-white flex flex-row rounded-lg shadow overflow-hidden">
                        <img className="h-[150px] aspect-square object-cover" src={cartItem.product.image} alt={cartItem.name}/>
                        <div className="h-full w-[280px] p-4 flex flex-col justify-between overflow-hidden ">

                            <p className="text-xs text-gray-500">{cartItem.product.productId}</p>
                            <h1 className="text-xl font-bold ">{cartItem.product.name}</h1>
                            <div className="w-[210px] h-[50px] border rounded-full flex overflow-hidden">
                               <button onClick={
                                ()=>{

                                    const newCart = [...cart]
                                    newCart[index].qty = newCart[index].qty - 1
                                    if(newCart[index].qty<=0){
                                       
                                        newCart.splice(index,1)
                                        
                                    }
                                    setCart(cart)
                                }
                               } className="w-[700px] h-full flex justify-center items-center text-lg font-bold text-gray-700 hover:bg-blue-400 ">
                                <BiMinus/>
                               </button>
                               <span className="w-[700px] h-full flex justify-center items-center text-lg font-bold text-gray-700">{cartItem.qty}</span>
                               <button onClick={
                                ()=>{
                                   const newCart = [...cart]
                                   newCart[index].qty = newCart[index].qty + 1
                                   setCart(newCart)
                                }
                               } className="w-[700px] h-full flex justify-center items-center text-lg font-bold text-gray-700 hover:bg-blue-400 ">
                                <BiPlus/>
                               </button>
                            </div>

                            
                        </div>

                        <div className="w-[170px] h-full  flex flex-col justify-center items-end pr-2">
                            {
                                cartItem.product.labelledPrice>cartItem.product.Price &&(
                                    <span className="text-sm text-gray-500 line-through">{getFormatPrice(cartItem.product.labelledPrice)} </span>

                                )
                            }
                            <span className="text-sm text-blue-500">{getFormatPrice(cartItem.product.price)} </span>
                            <span className="text-lg text-blue-500 font-bold">{getFormatPrice(cartItem.product.price * cartItem.qty)}</span>
                        </div>
                    </div>
                    
                    //<h1 key={index}>{cartItem.product.name} - {cartItem.qty}</h1>
                )
            })
           }
           <div className="bg-white w-[600px] h-[100px] sticky bottom-0 z-50 rounded-xl shadow flex justify-between items-center px-5">
    
   <CheckOutDetailsModel cart={cart} />

   <span className="text-lg font-bold text-blue-900 border-b-4 border-double">
      {getFormatPrice(getCartTotal(cart))}
   </span>

</div>
           </div>

           </div>
    )

}