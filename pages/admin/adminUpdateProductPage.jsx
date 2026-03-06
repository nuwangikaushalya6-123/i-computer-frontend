import { useState } from "react"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../src/utils/mediaUpload";

export default function AdminUpdateProductPage(){

    const location = useLocation()
    const [name , setName] = useState(location.state.name);
    const [productId , setProductId] = useState(location.state.productId);
    const [description , setDescription] = useState(location.state.description);
    const [altNames , setAltNames] = useState(location.state.altNames);
    const [price , setPrice] = useState(location.state.price);
    const [lablledPrice , setLablledPrice] = useState(location.state.lablledPrice);
    const [category , setCategory] = useState(location.state.category);  
    const [brand , setBrand] = useState(location.state.brand);
    const [model , setModel] = useState(location.state.model);
    const [IsVisible , setIsVisible] = useState(location.state.IsVisible);
    const [files , setFiles] = useState([]);
    const navigate = useNavigate();

    console.log(location);

    async function handleUpdateProduct(){
     
    
     try{



        const token = localStorage.getItem("token");
        if(token == null){
          toast.error("you must be logged in to add a product");
          Window.location.href = "/login";
          return;
        }

        const fileUploadPromises = [];

        for(let i=0 ; i<files.length ; i++){

          fileUploadPromises[i] = uploadFile(files[i])

        }

        let imageURLs = await Promise.all(fileUploadPromises);
       
        if(imageURLs.length == 0){
            imageURLs = location.state.images
        }
        

        

        await axios.put(import.meta.env.VITE_API_URL + "/products/"+productId,{
          name:name,
          description:description,
          price:price,
          lablledPrice:lablledPrice,
          altNames:altNames.split(","),
          images:imageURLs,
          category:category,
          brand:brand,
          model:model,
          IsVisible:IsVisible,
        },{
          headers: {
            Authorization: "Bearer " + token
          }
        })

        toast.success("product Updated successfully");
        navigate("/admin/products")
     }catch(err){
      // toast.error("Faild to add product");
       toast.error(err?.response?.data.message || "Faild to add product");
       return;
     }

    }

     return(
      
      
    <div className="w-full max-h-full    flex flex-wrap items-start overflow-y-scroll">
      <h1 className="w-full text-3xl font-bold md-4 sticky top-0 bg-primary">Edit Product</h1>

        <div className="w-[50%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Product ID :</label>
          <input value={productId} disabled onChange={(e)=>{setProductId(e.target.value)}} placeholder="Ex: ID001" className="border-4 border-secondary rounded-[10px] h-[50px] p-2 m-2 leading-[50px] focus:outline-none "/>
        </div>

        <div className="w-[50%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Product Name :</label>
          <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Ex: Laptop" className="border-4 border-secondary rounded-[10px] h-[50px] p-2 m-2 leading-[50px] focus:outline-none "/>
        </div>
        
        <div className="w-full h-[170px] flex flex-col">
          <label className=" font-bold ml-2">Description :</label>
          <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Ex: Laptop" className="border-4 border-secondary rounded-[10px] h-[100px] p-2 m-2 leading-[50px] focus:outline-none "/>
        </div>

        <div className="w-full h-[120px] flex flex-col">
          <label className="font-bold ml-2">Images</label>
          <input multiple type = "file" onChange={(e)=>{setFiles(e.target.files)}} className="border-4 border-secondary rounded-[10px] h-[50px] m-2 file:h-[40px] focus:outline-none file:text-grey-100"/>
        </div>

        <div className="w-full h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Alternative Names:</label>
          <input value={altNames} onChange={(e)=>{setAltNames(e.target.value)}} placeholder="Ex: Laptop , Notebook, portable Computer" className="border-4 border-secondary rounded-[10px] h-[50px] p-2 m-2 leading-[50px] focus:outline-none "/>
        </div>

        <div className="w-[50%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Price:</label>
          <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" placeholder="Ex:120$" className="border-4 border-secondary rounded-[10px] h-[500px] p-2 m-2 leading-[50px] focus:outline-none "/>
        </div>
        <div className="w-[50%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2"> Labled Price:</label>
          <input value={lablledPrice} onChange={(e)=>{setLablledPrice(e.target.value)}} type="number" placeholder="Ex:120$" className="border-4 border-secondary rounded-[10px] h-[500px] p-2 m-2 leading-[50px] focus:outline-none "/>
        </div>

        <div className="w-[25%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Category:</label>
          <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="border-4 border-secondary rounded-[10px] h-[500px] p-2 m-2 leading-[50px] focus:outline-none">
            <option value="Others">Others</option>
            <option value="Others">Laptops</option>
            <option value="Others">Desktops</option>
            <option value="Others">Components</option>
            <option value="Others">Accessories</option>
            <option value="Others">Peripherals</option>
          </select>
        </div>

        <div className="w-[25%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Brand:</label>
          <select value={brand} onChange={(e)=>{setBrand(e.target.value)}} className="border-4 border-secondary rounded-[10px] h-[500px] p-2 m-2 leading-[50px] focus:outline-none">
            <option value="Genaric">Genaric</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Asus">Asus</option>
            <option value="Acer">Acer</option>
            <option value="Apple">Apple</option>
          </select>
        </div>

         <div className="w-[25%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Model:</label>
          <input value={model} onChange={(e)=>{setModel(e.target.value)}}  placeholder="Ex: Inspiron 15" className="border-4 border-secondary rounded-[10px] h-[500px] p-2 m-2 leading-[50px] focus:outline-none"/>
           
        </div>

        <div className="w-[25%] h-[120px] flex flex-col">
          <label className=" font-bold ml-2">Is Visible:</label>
          <select value={IsVisible} onChange={(e)=>{setIsVisible(e.target.value)}} className="border-4 border-secondary rounded-[10px] h-[500px] p-2 m-2 leading-[50px] focus:outline-none">
            <option value={true}>yes</option>
            <option value={false}>No</option>
          </select>
        </div>

       <div className="w-full h-[80px] bg-white sticky bottom-0 rounded-b-2xl flex justify-end items-center p-4 gap-4">
         <button onClick={handleUpdateProduct} className="bg-secondary text-white font-bold px-6 py-3 rounded-[10px] hover:bg-accent">Update Product</button>
         <button className="bg-gray-500 text-white font-bold px-6 py-3 rounded-[10px] hover:bg-gray-800 ml-4">cancel</button>

       </div>
        

    </div>
    
    )
}