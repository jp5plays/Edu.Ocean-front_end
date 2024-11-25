// function confirmar_senha() {
//     const senha = document.querySelector("#senha").value;
    

//     const elemento = document.querySelector("div");

//     const mensagem = document.querySelector("#texto");
        

//     elemento.setAttribute("id", "texto");


    

//     elemento.removeAttribute("id", "texto");
// }
// document.querySelector("#confirm_senha").addEventListener("input", confirmar_senha);

document.querySelector("#formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Pegando os valores dos campos do formulário
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const ra = document.querySelector("#ra").value;
    const senha = document.querySelector("#senha").value;
    const senha2 = document.querySelector("#confirm_senha").value;

    if (senha !== senha2) {
        
        alert("Coloque a mesma senha nos dois campos")
        return
    }

    const dados = { nome, email, ra, senha };

    fetch("https://eduocean-backend.vercel.app/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(response => response.json()) 
    .then(data => {
      
        if (data.message) {
        
            alert(data.message)
        } else {
            alert("Cadastro realizado com sucesso!")
            window.location.href = "../login/login.html";
            
        }
    })
    .catch(error => {
        console.log("Erro:", error);
    });
});