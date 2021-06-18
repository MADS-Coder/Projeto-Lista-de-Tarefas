// 1) Temos que referenciar o input.
let input = document.querySelector('input[name=tarefa]');

// 2) Temos que referenciar o button.
let btn = document.querySelector('#botao');

// 3) Temos que referenciar a lista.
let lista = document.querySelector('#lista');

// Seleciona a (div) de class (card).
let card = document.querySelector('.card');

// O JS tenta acessar o localStorage e buscar o array (tarefas), se encontrar ele transforma em uma array, se não se existir ele coloca o array como um array vazio.
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
    // Limpar a listagem de itens antes de renderizar novamente a tela.
    lista.innerHTML = '';

    // Para cada tarefa em tarefas(lista), mostre cada tarefa.
    for(tarefa of tarefas){
        // Criar o item da lista.
        let itemLista = document.createElement('li');

        // Muda o ponteiro do mouse.
        itemLista.style.cursor = 'pointer';

        // Adicionar classe no item da lista.
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        // Adicionar o evento de click no item da lista.
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        // Criar um texto (será o filho da lista).
        let itemTexto = document.createTextNode(tarefa);

        // Adicionar os filhos (itemTexto) no itemLista.
        itemLista.appendChild(itemTexto); 

        // Adicionar o item da lista na lista.
        lista.appendChild(itemLista);
    }
}

//Executando a função renderizar tarefas.
renderizarTarefas();


// Adicionando o evento no botão cadastrar.
btn.onclick = function(){
    // Precisamos capturar o valor digitado pelo usuario no input.
    let novaTarefa = input.value;
    
    // Verificar se o texto é diferente de uma string vazia.
    if(novaTarefa !== ""){
        // Precisamos atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela.
        tarefas.push(novaTarefa);

        // Executando a função renderizar tarefas.
        renderizarTarefas();

        // Limpar o input.
        input.value = '';

        // Limpar mensagens de SPANS.
        removerSpans();

        // Salva os novos dados no banco de dados.
        salvarDadosnoStorage();
    }else{
        // Limpar mensagens de SPANS.
        removerSpans();

        // Cria um elemento span, e atribue uma classe Bootstrap a esse elemento.
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        // Cria uma mensagem de alerta.
        let msg = document.createTextNode('Você precisa informar a tarefa!');

        // Adiciona ao elemento span a mensagem de alerta.
        span.appendChild(msg);

        // Adiciona a (div) de classe card o span com a mensagem de alerta.
        card.appendChild(span);
    }
}

function removerSpans(){
    // Seleciona todos os elementos (span).
    let spans = document.querySelectorAll('span');

    // Itera sobre a lista de spans e remove os mesmos da (div) de classe (card).
    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar){
    // Remove a tarefa da lista, a partir de um índice ele detele somente um elemento (ele mesmo).
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    // Rendereziar a tela.
    renderizarTarefas();

    // Salva os novos dados no banco de dados.
    salvarDadosnoStorage();
}

function salvarDadosnoStorage(){
    // Todo navegador WEB possui esta capacidade de armazenamentos de dados (storage).
    // Pega a Array (tarefas) transforma em string JSON e armazena no BD STORAGE.
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}