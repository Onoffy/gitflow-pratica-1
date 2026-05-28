const input = document.getElementById("taskInput");
const btn = document.getElementById("addTaskBtn");
const lista = document.getElementById("taskList");
const erro = document.getElementById("errorMessage");

// ==========================
// DARK MODE
// ==========================

const themeToggle = document.getElementById("themeToggle");

// pega tema salvo
let temaSalvo = localStorage.getItem("tema");

// aplica tema salvo
if (temaSalvo === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = "☀️ Light Mode";
}

// troca tema
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    // verifica tema atual
    const darkAtivo =
        document.body.classList.contains("dark");

    // salva no localStorage
    localStorage.setItem(
        "tema",
        darkAtivo ? "dark" : "light"
    );

    // altera texto botão
    themeToggle.innerHTML =
        darkAtivo
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
});

// ==========================
// LOCAL STORAGE
// ==========================

// fallback para array vazio caso venha null
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// renderiza tarefas salvas
renderizarTarefas();

// evento botão
btn.addEventListener("click", adicionarTarefa);

function adicionarTarefa() {

    let texto = input.value.trim();

    // validação
    if (texto === "") {
        erro.textContent =
            "O campo de tarefa não pode estar vazio.";
        return;
    }

    erro.textContent = "";

    // ativa loading
    btn.classList.add("loading");
    btn.disabled = true;

    // simula carregamento
    setTimeout(() => {

        const novaTarefa = {
            titulo: texto,
            descricao: "Tarefa adicionada pelo usuário.",
            status: "Pendente"
        };

        // adiciona no array
        tarefas.unshift(novaTarefa);

        // salva no localStorage
        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        );

        // atualiza tela
        renderizarTarefas();

        input.value = "";

        btn.classList.remove("loading");
        btn.disabled = false;

    }, 1000);

}

function renderizarTarefas() {

    lista.innerHTML = "";

    tarefas.forEach((tarefa) => {

        const card = document.createElement("article");

        card.classList.add("task-card");

        card.innerHTML = `
            <div class="task-info">
                <h3>${tarefa.titulo}</h3>
                <p>${tarefa.descricao}</p>
            </div>

            <span class="status">
                ${tarefa.status}
            </span>
        `;

        lista.appendChild(card);

    });

}