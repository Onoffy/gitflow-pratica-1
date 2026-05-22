const input = document.getElementById("taskInput");
const btn = document.getElementById("addTaskBtn");
const lista = document.getElementById("taskList");
const erro = document.getElementById("errorMessage");

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

        const tarefa = document.createElement("article");

        tarefa.classList.add("task-card");

        tarefa.innerHTML = `
            <div class="task-info">
                <h3>${texto}</h3>
                <p>Tarefa adicionada pelo usuário.</p>
            </div>

            <span class="status">
                Pendente
            </span>
        `;

        lista.prepend(tarefa);

        input.value = "";

        btn.classList.remove("loading");
        btn.disabled = false;

    }, 1000);

}