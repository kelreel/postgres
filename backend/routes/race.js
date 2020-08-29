const Router = require('koa-router')
const router = new Router({ prefix: '/race' })
const Race = require('../models/Race')

router.get('/', async (ctx) => {
  const races = await Race.query()
  ctx.body = races
})

router.get('/:id', async (ctx) => {
  const race = await Race.query().findById(ctx.params.id)
  ctx.body = race
})

router.post('/', async (ctx) => {
  const race = await Race.query().insert(ctx.request.body)
  ctx.body = race
})

router.patch('/:id', async (ctx) => {
  const numUpdated = await Race.query().findById(ctx.params.id).patch(ctx.request.body)
  ctx.body = {
    success: numUpdated == 1,
  }
})

router.delete('/:id', async (ctx) => {
  const numDeleted = await Race.query().findById(ctx.params.id).delete()

  ctx.body = {
    success: numDeleted == 1,
  }
})

module.exports = router
