const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cliente = new net.Socket();

cliente.connect(5000, 'localhost', () => {
  console.log('Conectado ao servidor.');
  mostrarMenu();
});

cliente.on('data', (dados) => {
  console.log(dados.toString());
  mostrarMenu();
});

function mostrarMenu() {
  console.log('\n--- MENU ---');
  console.log('1. Criar tarefa');
  console.log('2. Listar tarefas');
  console.log('3. Deletar tarefa');
  console.log('0. Sair');
  rl.question('Escolha uma opção: ', (opcao) => {
    if (opcao === '1') {
      rl.question('Título da tarefa: ', (titulo) => {
        cliente.write(`CRIAR|${titulo}`);
      });
    } else if (opcao === '2') {
      cliente.write('LISTAR');
    } else if (opcao === '3') {
      rl.question('ID da tarefa a deletar: ', (id) => {
        cliente.write(`DELETAR|${id}`);
      });
    } else if (opcao === '0') {
      console.log('Encerrando cliente.');
      cliente.end();
      rl.close();
    } else {
      console.log('Opção inválida.');
      mostrarMenu();
    }
  });
}
