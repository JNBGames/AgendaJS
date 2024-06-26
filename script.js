let contatos = [];
let paginaAtual = 0;
let contatosPorPagina = 5;


function adicionarContato() {
  const nome = document.getElementById('nome-completo').value;
  const sobrenome = document.getElementById('sobrenome-contato').value;
  const endereco = document.getElementById('endereco-rua').value;
  const telefone = document.getElementById('telefone-contato').value;

  contatos.push({ nome, sobrenome, endereco, telefone });
  atualizarListaContatos();
  limparFormulario();
}


function editarContato(index) {
  const contato = contatos[index];
  document.getElementById('nome-completo').value = contato.nome;
  document.getElementById('sobrenome-contato').value = contato.sobrenome;
  document.getElementById('endereco-rua').value = contato.endereco;
  document.getElementById('telefone-contato').value = contato.telefone;
}


function removerContato(index) {
  contatos.splice(index, 1);
  atualizarListaContatos();
}


function atualizarListaContatos() {
    const listaContatos = document.getElementById('lista-contatos');
    listaContatos.innerHTML = '';
    
    const startIndex = paginaAtual * contatosPorPagina;
    const endIndex = startIndex + contatosPorPagina;
    
    for (let i = startIndex; i < endIndex && i < contatos.length; i++) {
      const contato = contatos[i];
      const li = document.createElement('li');
      li.textContent = `${contato.nome} ${contato.sobrenome} - ${contato.endereco} - ${contato.telefone}`;
      li.dataset.index = i;
      
      li.addEventListener('click', () => {
        selecionarContato(i);
      });
      
      listaContatos.appendChild(li);
    }
    
    atualizarPaginacao();
  }
  
  function selecionarContato(index) {
    const contato = contatos[index];
    document.getElementById('nome-completo').value = contato.nome;
    document.getElementById('sobrenome-contato').value = contato.sobrenome;
    document.getElementById('endereco-rua').value = contato.endereco;
    document.getElementById('telefone-contato').value = contato.telefone;
    
   
    selectedContactIndex = index;
  }
  
  
  let selectedContactIndex = -1;
  

  document.getElementById('atualizar-contato').addEventListener('click', () => {
    if (selectedContactIndex >= 0) {
      editarContato(selectedContactIndex);
    }
  });
  
  document.getElementById('excluir-contato').addEventListener('click', () => {
    if (selectedContactIndex >= 0) {
      removerContato(selectedContactIndex);
      selectedContactIndex = -1;
    }
  });

function limparFormulario() {
  document.getElementById('nome-completo').value = '';
  document.getElementById('sobrenome-contato').value = '';
  document.getElementById('endereco-rua').value = '';
  document.getElementById('telefone-contato').value = '';
}


function atualizarPaginacao() {
  const totalPaginas = Math.ceil(contatos.length / contatosPorPagina);
  const statusPagina = document.getElementById('status-pagina');
  statusPagina.textContent = `Página ${paginaAtual + 1} de ${totalPaginas}`;

  const proximaPaginaButton = document.getElementById('proxima-pagina');
  const paginaAnteriorButton = document.getElementById('pagina-anterior');
  const primeiraPaginaButton = document.getElementById('primeira-pagina');
  const ultimaPaginaButton = document.getElementById('ultima-pagina');

  if (paginaAtual === 0) {
    paginaAnteriorButton.disabled = true;
    primeiraPaginaButton.disabled = true;
  } else {
    paginaAnteriorButton.disabled = false;
    primeiraPaginaButton.disabled = false;
  }

  if (paginaAtual === totalPaginas - 1) {
    proximaPaginaButton.disabled = true;
    ultimaPaginaButton.disabled = true;
  } else {
    proximaPaginaButton.disabled = false;
    ultimaPaginaButton.disabled = false;
  }
}


function salvarContato() {
  const index = contatos.length - 1; 
  const contato = contatos[index];
  contato.nome = document.getElementById('nome-completo').value;
  contato.sobrenome = document.getElementById('sobrenome-contato').value;
  contato.endereco = document.getElementById('endereco-rua').value;
  contato.telefone = document.getElementById('telefone-contato').value;
  atualizarListaContatos();
  limparFormulario();
}

document.getElementById('adicionar-contato').addEventListener('click', adicionarContato);
document.getElementById('atualizar-contato').addEventListener('click', () => editarContato(contatos.length - 1));
document.getElementById('excluir-contato').addEventListener('click', () => removerContato(contatos.length - 1));
document.getElementById('salvar-contato').addEventListener('click', salvarContato);
document.getElementById('proxima-pagina').addEventListener('click', () => {
  paginaAtual++;
  atualizarListaContatos();
});
document.getElementById('pagina-anterior').addEventListener('click', () => {
  paginaAtual--;
  atualizarListaContatos();
});
document.getElementById('primeira-pagina').addEventListener('click', () => {
  paginaAtual = 0;
  atualizarListaContatos();
});
document.getElementById('ultima-pagina').addEventListener('click', () => {
  paginaAtual = Math.ceil(contatos.length / contatosPorPagina) - 1;
  atualizarListaContatos();
});

atualizarListaContatos(); 