
export default function ProductCard (props) {
    return(
        <div className="bg-red-500">
            <h2>{props.name}</h2>
            <img src={props.image} className="border-4"/>
            <p>Price: {props.price}</p>
            <button>Buy Now</button>
        </div>
    )
}