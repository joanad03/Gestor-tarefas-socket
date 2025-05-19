const net = require('net');

let tarefas = [];
let idAtual = 1;

const servidor = net.createServer((socket) => {
  socket.on('data', (dados) => {
    const mensagem = dados.toString().trim();
    const partes = mensagem.split('|');
    const comando = partes[0];

    if (comando === 'CRIAR') {
      const titulo = partes[1];
      const tarefa = { id: idAtual++, titulo };
      tarefas.push(tarefa);
      console.log("Tarefa criada: ${JSON.stringify(tarefa)}");
      socket.write("Tarefa criada ${tarefa.id}\n");

    } else if (comando === 'LISTAR') {
      console.log("Listar as tarefas.");
      if (tarefas.length === 0) {
        socket.write("Nenhuma tarefa encontrada.\n");
      } else {
        tarefas.forEach((t) => {
          socket.write("ID: ${t.id} - Título: ${t.titulo}\n");
        });
      }

    } else if (comando === 'DELETAR') {
      const id = parseInt(partes[1]);
      const indice = tarefas.findIndex((t) => t.id === id);
      if (indice !== -1) {
        const removida = tarefas.splice(indice, 1)[0];
        console.log("Tarefa deletada: ${JSON.stringify(removida)}");
        socket.write("Tarefa ${id} deletada.\n");
      } else {
        socket.write("Tarefa ${id} não encontrada.\n");
      }

    } else {
      console.log("Comando inválido recebido: ${mensagem}");
      socket.write('Comando inválido.\n');
    }

    
    console.log("Tarefas atuais:", tarefas);
  });
});

servidor.listen(5000, () => {
  console.log('Servidor ouvindo na porta 5000');
});
