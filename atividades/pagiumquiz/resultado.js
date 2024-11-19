
import { getName } from "../utils/get-name.js"
import { getEmail } from "../utils/get-email.js"
import{verificarTema,trocarTema} from "./helpers/tema-helper.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")
const botaoJogarNovamente = document.querySelector("main button" )

botaoTema.addEventListener("click", () => {
    trocarTema(body,botaoTema)
    
})



verificarTema(body,botaoTema)



function inserirResultado() {
    const sectionPontuacao = document.querySelector(".pontuacao");
    const pontos = localStorage.getItem("pontos"); // Pega o valor de pontos do localStorage
    sectionPontuacao.innerHTML = `
        <strong>${pontos}</strong>
        <button id="meuLink">Ir para Ranking</button>
        <p>de 10</p>
    `;

    // Adicionando o ouvinte de clique no botão para redirecionar
    const botao = document.getElementById("meuLink");
    botao.addEventListener("click", rankin);  // "rankin" deve ser a função de redirecionamento que você já tem
}


async function  rankin(){
    const pontos = localStorage.getItem("pontos")
    const nome  = await getName()
    const email = await getEmail()
    const dados = {
        pontos,nome,email
    }
    await fetch("https://eduocean-backend.vercel.app/rankin/save",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
    window.location.href = "../rankin/rankin.html";

}


inserirResultado()

