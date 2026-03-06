import { createClient } from "@supabase/supabase-js";
const superbaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcGhuY2FkdGR6Y2N5bGZnbWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTk1NDgsImV4cCI6MjA4ODI3NTU0OH0.cqxt9j_Mspu9mbmYqjgWE9aY5dpdi0iFp_kA4ZlJlPU"
const superbaseUrl = "https://oqphncadtdzccylfgmil.supabase.co"


const supabase = createClient(superbaseUrl , superbaseKey)

export default function uploadFile(file){
  return new Promise(
    (resolve , reject)=>{
       
        if(file == null){
            reject("No file provided")
            return
        }

        const timestamp = new Date().getTime()
        const fileName = timestamp + "-"+file.name
        

        supabase.storage.from("images").upload(fileName , file , {
        upsert : false,
       cacheControl : 3600
    }).then(
        ()=>{
            const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
            resolve(url)
        }
    ).catch(
        ()=>{
            reject("Failed to upload file")
        }
    )


    }
  )
}