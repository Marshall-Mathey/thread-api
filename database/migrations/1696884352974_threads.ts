import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'threads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index().notNullable()
      table.string('title', 255).notNullable()
      table.text('content').notNullable()
      table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.uuid('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
