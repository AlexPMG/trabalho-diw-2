const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

// Configuração do CORS para permitir todas as origens
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware personalizado para logging
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rota de exemplo personalizada
server.get('/pokemons/search', (req, res) => {
  const { q } = req.query;
  const db = router.db;
  
  const resultados = db.get('pokemons').filter(p => 
    p.nome.toLowerCase().includes(q.toLowerCase()) ||
    p.tipo.toLowerCase().includes(q.toLowerCase())
  ).value();
  
  res.json(resultados);
});

// Rota para obter Pokémon por ID
server.get('/pokemons/:id', (req, res) => {
  const db = router.db;
  const pokemon = db.get('pokemons').find({ id: parseInt(req.params.id) }).value();
  
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: 'Pokémon não encontrado' });
  }
});

// Usar as rotas padrão do JSON Server
server.use(router);

// Iniciar servidor
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server está rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log(`  GET    http://localhost:${PORT}/pokemons`);
  console.log(`  GET    http://localhost:${PORT}/pokemons/:id`);
  console.log(`  POST   http://localhost:${PORT}/pokemons`);
  console.log(`  PUT    http://localhost:${PORT}/pokemons/:id`);
  console.log(`  DELETE http://localhost:${PORT}/pokemons/:id`);
  console.log(`  GET    http://localhost:${PORT}/pokemons/search?q=termo`);
});