import { verificarTema, trocarTema } from "./helpers/tema-helper.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");
const assunto = localStorage.getItem("assunto");

// Log para verificar o que está armazenado no localStorage
console.log("Assunto do localStorage:", assunto);  // Aqui verificamos o valor de 'assunto' no localStorage

let quiz = {};
let pontos = 0;
let perguntaAtualIndex = 0;
let estadoBolinhas = [];

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema);
});

verificarTema(body, botaoTema);

async function buscarPerguntas() {
    const urlDados = `https://eduocean-backend.vercel.app/api/quizzes?assunto=${assunto}`;

    console.log("URL da requisição:", urlDados);

    try {
        const resposta = await fetch(urlDados, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resposta.ok) {
            console.error(`Erro na resposta da API: ${resposta.status} ${resposta.statusText}`);
            throw new Error(`Erro ao buscar dados da API: ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        console.log("Dados recebidos da API:", dados);  // Log para verificar a resposta

        if (dados && dados.questions && dados.questions.length > 0) {
            quiz = dados;
            estadoBolinhas = Array(quiz.questions.length).fill(null);
        } else {
            throw new Error("Nenhum quiz encontrado para o assunto.");
        }
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro.message);
        const main = document.querySelector("main");
        main.innerHTML = `<p>Erro ao buscar o quiz: ${erro.message}</p>`;
    }
}

function montarPergunta() {
    if (!quiz.questions || quiz.questions.length === 0) {
        console.error("Nenhuma pergunta disponível.");
        return;
    }

    const main = document.querySelector("main");
    const perguntaAtual = quiz.questions[perguntaAtualIndex];
    console.log("Alternativas da pergunta:", perguntaAtual.options); // Log para verificar as alternativas

    // Montando o HTML com as alternativas diretamente no innerHTML
    main.innerHTML = `
        <section class="pergunta">
            <p>Questão ${perguntaAtualIndex + 1} de ${quiz.questions.length}</p>
            <h2>${perguntaAtual.question}</h2>
            <div class="bolinhas-container">
                ${estadoBolinhas
                    .map((estado, index) => `<div class="bolinha ${estado || ''}" data-id="${index + 1}"></div>`)
                    .join("")}
            </div>
        </section>
        <section class="alternativas">
            <form>
                ${perguntaAtual.options
                    .map((option, index) => {
                        // Adicionando as alternativas diretamente no innerHTML
                        return `
                            <label id="alternativa-${index}">
                                <input type="radio" name="resposta" value="${option}">
                                <span>${String.fromCharCode(65 + index)}</span> ${option}
                            </label>
                        `;
                    })
                    .join("")}
            </form>
            <button id="botao-enviar">${perguntaAtualIndex + 1 === quiz.questions.length ? 'Finalizar' : 'Enviar'}</button>
        </section>
    `;

    // Adicionando o evento ao botão de enviar
    const botaoEnviar = document.querySelector("#botao-enviar");
    botaoEnviar.addEventListener("click", (event) => {
        if (botaoEnviar.disabled) return; // Impede novo clique enquanto está desabilitado
        botaoEnviar.disabled = true; // Desabilita o botão para evitar cliques enquanto processa

        if (perguntaAtualIndex + 1 === quiz.questions.length) {
            finalizar(); // Chama a função finalizar quando for a última pergunta
        } else {
            validarResposta(event);
        }
    });
}

function validarResposta(event) {
    event.preventDefault();

    const inputs = document.querySelectorAll('input[name="resposta"]');
    const respostaSelecionada = [...inputs].find(input => input.checked)?.value;

    if (!respostaSelecionada) {
        alert("Selecione uma resposta!");
        return;
    }

    const perguntaAtual = quiz.questions[perguntaAtualIndex];
    const bolinhaAtual = document.querySelector(`.bolinha[data-id="${perguntaAtualIndex + 1}"]`);

    // Resetando as classes anteriores de borda nas alternativas
    const alternativasLabels = document.querySelectorAll('.alternativas label');
    alternativasLabels.forEach(label => {
        label.classList.remove('correta', 'errada');
    });

    // Verificando e adicionando a classe correta nas alternativas
    if (respostaSelecionada === perguntaAtual.answer) {
        pontos++;
        bolinhaAtual.classList.add("verde");

        // Adicionando a classe 'correta' à alternativa certa
        document.querySelector(`#alternativa-${perguntaAtual.options.indexOf(respostaSelecionada)}`).classList.add('correta');
    } else {
        bolinhaAtual.classList.add("vermelha");

        // Adicionando a classe 'errada' à alternativa errada
        document.querySelector(`#alternativa-${perguntaAtual.options.indexOf(respostaSelecionada)}`).classList.add('errada');
        
        // Adicionando a classe 'correta' à alternativa correta
        document.querySelector(`#alternativa-${perguntaAtual.options.indexOf(perguntaAtual.answer)}`).classList.add('correta');
    }

    estadoBolinhas[perguntaAtualIndex] = bolinhaAtual.className;

    // Condicional para avançar ou finalizar
    setTimeout(() => {
        if (perguntaAtualIndex + 1 < quiz.questions.length) {
            perguntaAtualIndex++;
            montarPergunta();
        } else {
            finalizar();
        }
        botaoEnviar.disabled = false; // Reabilita o botão após o tempo de espera
    }, 1000); // Atraso de 2 segundos para continuar para a próxima pergunta ou finalizar
}

function finalizar() {
    localStorage.setItem("pontos", pontos);
    window.location.href = "./resultado.html";
}

async function iniciar() {
    const main = document.querySelector("main");

    try {
        await buscarPerguntas();
        if (quiz.questions && quiz.questions.length > 0) {
            montarPergunta();
        } else {
            main.innerHTML = "<p>Não foi possível carregar o quiz. Tente novamente mais tarde.</p>";
        }
    } catch (erro) {
        main.innerHTML = `<p>Erro ao iniciar o quiz: ${erro.message}</p>`;
        console.error(erro);
    }
}

iniciar();
















