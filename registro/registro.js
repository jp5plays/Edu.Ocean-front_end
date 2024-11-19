function confirmar_senha() {
    const senha = document.querySelector("#senha").value;
    const senha2 = document.querySelector("#confirm_senha").value;
    if (senha !== senha2) {
        
        const elemento = document.querySelector("div");
        elemento.setAttribute("id", "texto");

        const mensagem = document.querySelector("#texto");
        mensagem.innerHTML = "  <strong>Coloque a mesma senha nos dois campos</strong> ";
       
    } else {
        const div = document.querySelector("div");
        div.removeAttribute("id", "texto");

        const mensagem = document.querySelector("#texto");
        
       
    }
}
document.querySelector("#confirm_senha").addEventListener("input", confirmar_senha);

document.querySelector("#formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Pegando os valores dos campos do formulário
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const ra = document.querySelector("#ra").value;
    const senha = document.querySelector("#senha").value;

    const dados = { nome, email, ra, senha };

    fetch("https://eduocean-backend.vercel.app/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(response => response.json()) 
    .then(data => {
      
        if (data.message) {
           
            document.querySelector("#mensagem").innerText = data.message;
        } else {
          
            document.querySelector("#mensagem").innerText = "Cadastro realizado com sucesso!";
            window.location.href = "../login/login.html";
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        document.querySelector("#mensagem").innerText = "Erro ao cadastrar.";
    });
});
