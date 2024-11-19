

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
