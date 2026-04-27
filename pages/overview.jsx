import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingAnimation from "../src/components/loadingAnimation";
import ImageSlideShow from "../src/components/imageSlideShow";
import getFormatPrice from "../src/utils/price-format";
import { addToCart, getCart } from "../src/cart";



export default function overview() {
    const params = useParams();
    console.log(params)

    //fetch product details using params.productId and display themhere
    const [product, setProduct] = useState(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products/" + params.productId).then(
            (response) => {
                setProduct(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
                toast.error("failed to fetch product details");
            }
        )
    }, []);

    return (
        <div className="w-full lg:h-[calc(100vh-100px)] flex justify-center items-center ">
            {
                product == null ? <LoadingAnimation /> :
                    <div className="w-full  flex flex-col lg:flex-row bg-blue-200 ">
                        <h1 className="text-3xl font-bold mb-4 p-4 lg:hidden">{product.name}

                            {
                                product.altNames.map((altName, index) => {
                                    return (
                                        <span key={index} className=" text-gray-500 font-medium"> | {altName} </span>
                                    )
                                })
                            }

                        </h1>
                        <div className="w-full p-4 lg:p-0 lg:w-[50%]  lg:h-full  flex justify-center items-center">
                            <ImageSlideShow images={product.images} />

                        </div>
                        <div className="lg:w-[50%] h-full p-5 flex justify-center flex-col">
                            <h1 className="text-3xl hidden lg:block font-bold mb-4">{product.name}

                                {
                                    product.altNames.map((altName, index) => {
                                        return (
                                            <span key={index} className="text-gray-500 font-medium"> | {altName}</span>
                                        )
                                    })
                                }

                            </h1>
                            {/*brand name and model available */}
                            {(product.brand || product.model) &&
                                <p className="text-lg font-medium mb-2">
                                    <span>{product.brand}|| ""</span>
                                    <span> </span>
                                    <span>{product.brand} || ""</span>
                                </p>
                            }
                            {/* product Id */}
                            <p className="text-sm text-gray-500 mb-4">{product.productId}</p>

                            {/* descrription */}
                            <p className="text-md mb-4">{product.description}</p>
                            {/* price */}
                            <p className="text-lg text-gray-500 font-bold mb-4">{getFormatPrice(product.price)}</p>

                            <p className="text-lg text-gray-500 line-through mb-4">{getFormatPrice(product.labelledPrice)}</p>
                            <div className="w-full h-[100px]  flex justify-start items-center text-white font-bold text-xl">
                                <button className="px-4 py-2 bg-green-500 rounded hover:bg-green 600 cursor-pointer " onClick={
                                    () => {
                                        addToCart(product, 1)
                                        toast.success(product.name + "product added to cart")
                                    }
                                }>Add to Cart</button>
                                <Link to="/checkout" state={
                                    [
                                        {
                                            product: {
                                                name: product.name,
                                                price: product.price,
                                                labelledPrice: product.labelledPrice,
                                                image: product.images?.[0],
                                                productId: product.productId



                                            },
                                            qty: 1
                                        }
                                    ]
                                } className="px-4 py-2 bg-blue-500 rounded hover:bg-green-600 ml-4 cursor-pointer"
                                >Buy Now</Link>
                            </div>

                        </div>
                    </div>
            }

        </div>
    )
}