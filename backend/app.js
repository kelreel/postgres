const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const Knex = require('knex')
const knexConfig = require('./knexfile')
const { Model, ForeignKeyViolationError, ValidationError } = require('objection')

// Import routers
const raceRouter = require('./routes/race')
const heroRouter = require('./routes/hero')
const creatureRouter = require('./routes/creature')
const spellRouter = require('./routes/spell')
const spell_list_Router = require('./routes/spell_list')
const armyRouter = require('./routes/army')

// Init knex.
const knex = Knex(knexConfig.development)
Model.knex(knex)

// Init app
const app = new Koa()

// Init app middlewares
app.use(cors())
app.use(errorHandler)
app.use(bodyParser())

// Init routes
app.use(raceRouter.routes())
app.use(heroRouter.routes())
app.use(creatureRouter.routes())
app.use(spellRouter.routes())
app.use(armyRouter.routes())
app.use(spell_list_Router.routes())

// Start app server
const server = app.listen(8641, () => {
  console.log('Example app listening at port %s', server.address().port)
})

// Error handling
async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err instanceof ValidationError) {
      ctx.status = 400
      ctx.body = {
        error: 'ValidationError',
        errors: err.data,
      }
    } else if (err instanceof ForeignKeyViolationError) {
      ctx.status = 409
      ctx.body = {
        error: 'ForeignKeyViolationError',
      }
    } else {
      ctx.status = 500
      ctx.body = {
        error: 'InternalServerError',
        message: err.message || {},
      }
    }
  }
}
