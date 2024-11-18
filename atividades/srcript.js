import { getName } from "./utils/get-name.js"
import {logout} from "./utils/logout.js"
import { trocarTema, verificarTema} from"./pagiumquiz/helpers/tema-helper.js"
const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
botaoTema.addEventListener("click", () =>{
    trocarTema(body,botaoTema)
})
verificarTema(body,botaoTema)

const botoesAssunto = document.querySelectorAll(".assuntos button")
botoesAssunto.forEach(botao =>{
    botao.addEventListener("click", selecionarAssunto)
})

function selecionarAssunto(evento){
    const assunto = evento.target.innerText
    localStorage.setItem("assunto", assunto)
    window.location.href = "./pagiumquiz/quiz.html"

}


async function verifyToken(){
    const token = localStorage.getItem("token")

    if(!token){
        window.location.href = "../login/login.html"
        return
    }
    const response = await fetch('http://localhost:3000/verify', {

        headers:{
            "Authorization":token
        }

    }).then(response =>response.json())

    if (!response.ok){
        alert(response.massage)
        window.location.href = "../login/login.html"
    }

}

verifyToken()
const name  = await getName()
const nameStrong =  document.querySelector("#user")
nameStrong.innerText = `${name}` 
logout()
















