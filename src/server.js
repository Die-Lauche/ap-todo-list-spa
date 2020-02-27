import { Server, Model, Factory, Serializer, hasMany, belongsTo } from 'miragejs'

const ApplicationSerializer = Serializer.extend()

const server = new Server({
  models: {
    user: Model,
    list: Model.extend({
      todos: hasMany()
    }),
    todo: Model.extend({
      list: belongsTo()
    })
  },

  factories: {
    list: Factory.extend({
      title (i) {
        return `List ${i}`
      },

      userId: 1
    }),
    todo: Factory.extend({
      content (i) {
        return `ToDo ${i}`
      },

      completed: false,

      userId: 1
    })
  },

  serializers: {
    application: ApplicationSerializer,
    list: ApplicationSerializer.extend({
      include: ['todos']
    })
  },

  routes () {
    this.namespace = '/api'

    this.post('/login', (schema, request) => {
      const credentials = JSON.parse(request.requestBody)

      const user = schema.users.findBy(credentials)
      if (user) {
        return { user }
      }

      return { error: 'Username or password wrong!' }
    })

    this.get('/lists/:userId', (schema, request) => {
      const userId = request.params.userId

      return schema.lists.where({ userId })
    })
  },

  seeds (server) {
    // for (let i = 1; i <= 3; i++) {
    //   server.create('user', { id: i, username: 'test' + i, password: 'test' + i })

    //   for (let j = 1; j <= 3; j++) {
    //     const todos = []
    //     for (let k = 1; k <= 5; k++) {
    //       todos.push(server.create('todo', { userId: i }))
    //     }

    //     server.create('list', { userId: i, todos })
    //   }
    // }

    server.create('user', { id: 1, username: 'test', password: 'test' })
    server.create('list', { userId: 1 })
    server.create('todo', { listId: 1 })
  }
})
console.dir(server)
