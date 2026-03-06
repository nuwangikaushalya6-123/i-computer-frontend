import { useState } from "react"



export default function Test(){


  //const [count,setCount]=useState(0)
  //const [isVisible,setIsVisible] = useState(true)

  const[file , setFiles] = useState(null)

  async function upload(){
     try{

      const url = await uploadFile(file)
      console.log(url)

     }catch(err){
       console.log("upload failed")
     }
   

  }

  return(
    <div className="w-full h-full  flex items-center justify-center ">

     <input type="file" onChange={
      (e)=>{
           setFiles(e.target.files[0])
     }}/>

    <button onClick={upload} className="w-[100px] h-[40px] bg-blue-500 text-white rounded-lg">
      upload
    </button>
      {/*
      <h1>{isVisible}</h1>
      <button onClick={
            ()=>{
              setIsVisible(false)
            }
      }className="w-[50px] h-[50px] bg-red-600 text-white">X</button>
     { isVisible && <div className="w-[400px] bg-white flex justify-center items-center flex-col">
        <h1 className="text-[55px]">{count}</h1>
        <div className="w-full h-[50px]  flex items-center justify-center gap-2">
          <button onClick={
            ()=>{
              setCount(count - 1)
            }
          }className="w-[100px] h-[45px] bg-red-900 text-white">
            Decrement
          </button>
          <button onClick={
            ()=>{
              setCount(count + 1)
            }
          } className="w-[100px] h-[45px] bg-green-900 text-white">
            Increment
          </button>

        </div>

      </div>}
*/}
    </div>
  )
}
