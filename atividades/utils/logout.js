export function logout(){
    
    const button =  document.querySelector("#sair")
    button.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.reload()

    })
    


}