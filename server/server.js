const { authenticate } = require('./middlewares/authenticate.js');
const app = require('./server-config.js');
const routes = require('./server-routes.js');

const port = process.env.PORT || 8080;

app.post('/auth/login', routes.login);

app.use(authenticate);

// Todos
app.get('/', routes.getAllTodos);
app.get('/:id', routes.getTodo);
app.post('/', routes.postTodo);
app.patch('/:id', routes.patchTodo);
app.delete('/', routes.deleteAllTodos);
app.delete('/:id', routes.deleteTodo);

// Organizations
app.post('/organizations', routes.postOrganization);

// Users
app.post('/organizations/:organizationId/users', routes.postOrganizationUser);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
