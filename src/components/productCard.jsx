import { Link } from "react-router-dom";
import getFormatPrice from "../utils/price-format";

export default function ProductCard(props) {
    const product = props.product; // product object එක extract කරගන්න
    return (  // React component must return JSX
        <Link to={"/overview/"+product.productId}className="w-[300px] h-[400px] m-4  rounded-lg shadow-lg bg-white overflow-hidden hover:[&_.main-image]:opacity-0 relative ">
            <div className="bg-white  absolute top-0 left-0 w-full">
                <img src={product.images[1]} alt={product.name} className="h-[250px] w-full object-cover" />
            </div>
            <div className="bg-white main-image absolute w-full top-0 left-0 transition-opacity duration-500">
                <img src={product.images[0]} alt={product.name} className="h-[250px] w-full object-cover" />
            </div>
            <div className="h-[150px]  w-full absolute bottom-0 flex justify-center  flex-col p-2">
                <span className="text-xs opacity-50">{product.productId}</span>
                <h1 className="font-semibold text-lg">{product.name}</h1>
                {/* Price section */}
                <div className="flex items-center gap-2 mt-1">
                    {/* Normal price */}
                    <p className="font-bold text-green-600"> {getFormatPrice(product.price)}</p>

                    {/* Labelled price if higher */}
                    {product.labelledPrice > product.price && (
                        <p className="text-red-600 !line-through !text-red-600">
                            LKR {getFormatPrice(product.labelledPrice)}
                        </p>
                    )}
                </div>
                <p className="text-md font-bold">{getFormatPrice(product.price)}</p>
            </div>

        </Link>
    )
}