export async function getName() {
    const token = localStorage.getItem("token") 

    if(!token){

        return console.log('não tem token')
    }

    const response = await fetch("http://localhost:3000/getname",{
        headers:{
            "Authorization": token
        }

    }).then(response => response.json())
    return response.name
    
}