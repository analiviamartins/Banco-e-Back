const express = require('express');
const { Pool } = require('pg');
const app = express();
const port =4000;

app.use(express.json());
const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'aulaback2',
    password: 'ds564',
    port: '5432'
})

app.get('/usuarios', async (req, res)=> {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows,
        });
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).send('Erro ao obter usuários');
      }
})

app.post('/usuarios', async (req, res) => {
    try {
      const { nome, email } = req.body;
      await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
      res.status(201).send({ mensagem: 'Usuário adicionado com sucesso'});
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).send('Erro ao criar usuário');
    }
  });

  app.put('/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;
      await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3', [nome, email, id]);
      res.status(200).send({ mensagem: 'Usuário atualizado com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).send('Erro ao atualizar usuário');
    }
  });


  app.delete('/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
      res.status(200).send({ mensagem: 'Usuário excluído com sucesso'});
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).send('Erro ao excluir usuário');
    }
  });

app.get('/',(req, res) =>{
    res.send('Servidor funcionando')
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})