exports.up = function (knex) {
  return knex.schema.alterTable('todos', function (table) {
    table.integer('project_id').unsigned();
    table.foreign('project_id').references('projects.id').onDelete('SET NULL');
    table.integer('parent_todo_id').unsigned();
    table.foreign('parent_todo_id').references('todos.id').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('todos', function (table) {
    table.dropForeign('project_id');
    table.dropColumn('project_id');
    table.dropForeign('parent_todo_id');
    table.dropColumn('parent_todo_id');
    table.dropTimestamps();
  });
};
