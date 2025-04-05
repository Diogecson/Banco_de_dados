const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());  // Necessário para entender os dados em formato JSON

// Rota para cadastrar dados
app.post('/cadastrar', (req, res) => {
    const dados = req.body;

    // Verificar se os dados necessários foram enviados
    if (!dados.nome || !dados.telefone || !dados.email || !dados.cpf) {
        return res.status(400).json({ message: 'Dados incompletos' });
    }

    // Ler dados existentes no arquivo
    fs.readFile('dados.json', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: 'Erro ao ler arquivo' });
        }

        const jsonData = data ? JSON.parse(data) : [];
        jsonData.push(dados);

        // Escrever os dados no arquivo
        fs.writeFile('dados.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar dados' });
            }
            res.status(200).json({ message: 'Dados cadastrados com sucesso!' });
        });
    });
});

// Rota para buscar dados
app.get('/buscar', (req, res) => {
    fs.readFile('dados.json', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: 'Erro ao ler arquivo' });
        }

        const jsonData = data ? JSON.parse(data) : [];
        res.json(jsonData);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
