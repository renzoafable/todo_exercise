const todosRoutes = require('./routes/todo-routes');
const authRoutes = require('./routes/auth-routes');
const organizationRoutes = require('./routes/organization-routes');
const userRoutes = require('./routes/user-routes');

function addErrorReporting(func, message) {
  return async function (req, res) {
    try {
      return await func(req, res);
    } catch (err) {
      console.log(`${message} caused by: ${err}`);

      // Not always 500, but for simplicity's sake.
      res.status(500).send(`Opps! ${message}.`);
    }
  };
}

const toExport = {
  ...todosRoutes,
  ...authRoutes,
  ...organizationRoutes,
  ...userRoutes,
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
