
pegarDados()
async function pegarDados() {

    await fetch("https://eduocean-backend.vercel.app/rankin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }).then(response => response.json()).then(data => {
        exibir(data);
        function exibir(resultados) {
            const rankin = document.querySelector(".ranking-container");
        
            // Limpa o conteúdo anterior da container
            rankin.innerHTML = ""; 
        
            // Adiciona o título e imagem apenas uma vez
            rankin.innerHTML += `
          
           <nav>
            <ul>
                <li>
                    <a href="../../atividades/atividades.html"><img src="../../imgs-home/edulogo.png" alt="EduOcean" class="logo"></a>
                </li>
            </ul>
        </nav>
                
                <h1>Ranking - Flora Marinha</h1>
            `;
        
            // Itera sobre os resultados e cria um item para cada um
            resultados.forEach((resultado, index) => {
                console.log(`${resultado.nome} tem ${resultado.pontos} pontos.`);
        
                
                const rankingItem = `
                    <div class="ranking-item">
                        <p>${index + 1}- ${resultado.nome}</p>
                        <span>Acertou - ${resultado.pontos}/10 🏆</span>
                    </div>
                `;
        
                
                rankin.innerHTML += rankingItem;
            });
        }
       


    })
        .catch(error => console.log("Erro:", error));


}



