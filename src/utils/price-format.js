export default function getFormatPrice(price){
// is a valide number
if(price == null){
    return "N/A"
}
const priceInNumber = Number(price);
if(isNaN(priceInNumber)){
    return "N/A"
}else{
    return "LKR "+ priceInNumber.toLocaleString("en-US" , {minimumFractionDigits: 2 , maximumFractionDigits: 2});
}
}

// https://oqphncadtdzccylfgmil.supabase.co
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcGhuY2FkdGR6Y2N5bGZnbWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTk1NDgsImV4cCI6MjA4ODI3NTU0OH0.cqxt9j_Mspu9mbmYqjgWE9aY5dpdi0iFp_kA4ZlJlPU