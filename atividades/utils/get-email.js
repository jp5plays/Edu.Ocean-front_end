export async function getEmail() {
    const token = localStorage.getItem("token") 

    if(!token){

        return console.log('não tem token')
    }

    const response = await fetch("https://eduocean-backend.vercel.app/getemail",{
        headers:{
            "Authorization": token
        }

    }).then(response => response.json())
    return response.email
    
}