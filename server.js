const express = require('express');
const path = require('path'); // Importando o módulo path
const app = express();
const port = 4000;

app.use(express.json());

// Rota para retornar uma imagem
app.get('/img', (req, res) => {
  res.json({ img: 'https://via.placeholder.com/150' });
});

// Rota para retornar os dados de João
app.get('/joao', (req, res) => {
  res.json({
    nome: 'João',
    idade: 30,
    cpf: '123.456.789-00',
    email: 'joao@exemplo.com',
    profissao: 'Desenvolvedor'
  });
});

// Dados completos dos Pokémons
const pokemons = [
  {
    nome: 'Pikachu',
    tipo: 'Elétrico',
    altura: 0.4, // metros
    peso: 6.0,   // kg
    habilidade: 'Choque do Trovão',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  },
  {
    nome: 'Bulbasaur',
    tipo: 'Planta/Venenoso',
    altura: 0.7, 
    peso: 6.9,   
    habilidade: 'Overgrow',
    img: 'https://i0.wp.com/assets.b9.com.br/wp-content/uploads/2014/08/bulbasaur.png?fit=958%2C834&ssl=1'
  },
  {
    nome: 'Charmander',
    tipo: 'Fogo', 
    altura: 0.6, 
    peso: 8.5,   
    habilidade: 'Chama',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  }
];

// Rota para retornar apenas os nomes dos Pokémons
app.get('/pokemon', (req, res) => {
  const pokemonNames = pokemons.map(pokemon => pokemon.nome);
  res.json(pokemonNames);
});

// Rota para retornar os dados completos de um Pokémon
app.get('/pokemon/:nome', (req, res) => {
  const nome = req.params.nome.charAt(0).toUpperCase() + req.params.nome.slice(1).toLowerCase();
  const pokemon = pokemons.find(p => p.nome === nome);

  if (pokemon) {
    res.json(pokemon);  // Retorna os dados completos do Pokémon
  } else {
    res.status(404).json({ error: 'Pokémon não encontrado' });
  }
});

// Rota para retornar dados da fruta (exemplo)
app.get('/fruta', (req, res) => {
  res.json({ nome: 'Maçã', cor: 'Vermelha' });
});

app.get('/', (req, res) => {
  res.sendFile('C:/Users/victo/OneDrive/Documentos/FACULDADE/2025/Prova/react/react/pokedex.html');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
