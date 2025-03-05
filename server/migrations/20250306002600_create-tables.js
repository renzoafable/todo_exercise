exports.up = function (knex) {
  return knex.schema
    .createTable('organizations', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('user_roles', function (table) {
      table.increments('id');
      table.string('name').notNullable();
    })
    .createTable('user_organization', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('organization_id').unsigned().notNullable();
      table
        .foreign('organization_id')
        .references('organizations.id')
        .onDelete('CASCADE');
      table.integer('user_role_id').unsigned().notNullable();
      table
        .foreign('user_role_id')
        .references('user_roles.id')
        .onDelete('CASCADE');
      table.unique(['user_id', 'organization_id']);
    })
    .createTable('projects', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.integer('organization_id').unsigned().notNullable();
      table
        .foreign('organization_id')
        .references('organizations.id')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('user_project', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('project_id').unsigned().notNullable();
      table.foreign('project_id').references('projects.id').onDelete('CASCADE');
    })
    .createTable('comments', function (table) {
      table.increments('id');
      table.text('content', 'mediumtext').notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('todo_id').unsigned().notNullable();
      table.foreign('todo_id').references('todos.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  knex.schema.table('user_organization', (table) => {
    table.dropForeign('user_id');
    table.dropForeign('organization_id');
    table.dropForeign('user_role_id');
  });

  knex.schema.table('user_project', (table) => {
    table.dropForeign('user_id');
    table.dropForeign('project_id');
  });

  knex.schema.table('projects', (table) => {
    table.dropForeign('organization_id');
  });

  knex.schema.table('comments', (table) => {
    table.dropForeign('user_id');
    table.dropForeign('todo_id');
  });

  return knex.schema
    .dropTable('user_organization')
    .dropTable('user_project')
    .dropTable('projects')
    .dropTable('comments')
    .dropTable('organizations')
    .dropTable('user_roles');
};
