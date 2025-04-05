// Função para enviar os dados para o servidor
function enviarDados() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;

    if (!nome || !telefone || !email || !cpf) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const dados = { nome, telefone, email, cpf };

    // Enviar os dados para o servidor (Node.js)
    fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert('Erro desconhecido');
        }
    })
    .catch(error => {
        alert('Erro ao enviar dados');
        console.error(error);
    });
}

// Função para buscar os dados cadastrados
function buscarDados() {
    fetch('http://localhost:3000/buscar')
        .then(response => response.json())
        .then(data => {
            let output = '<ul>';
            if (data.length === 0) {
                output += '<li>Nenhum dado encontrado.</li>';
            } else {
                data.forEach(item => {
                    output += `<li>Nome: ${item.nome} | Telefone: ${item.telefone} | E-mail: ${item.email} | CPF: ${item.cpf}</li>`;
                });
            }
            output += '</ul>';
            document.getElementById('dados').innerHTML = output;
        })
        .catch(error => {
            alert('Erro ao buscar dados');
            console.error(error);
        });
}
