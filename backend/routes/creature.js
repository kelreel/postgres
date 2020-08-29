const Router = require('koa-router')
const router = new Router({ prefix: '/creature' })
const Creature = require('../models/Creature')

router.get('/', async (ctx) => {
  const creature = await Creature.query()
  ctx.body = creature
})

router.get('/:id', async (ctx) => {
  const creature = await Creature.query().findById(ctx.params.id)
  ctx.body = creature
})

router.post('/', async (ctx) => {
  const creature = await Creature.query().insert(ctx.request.body)
  ctx.body = creature
})

router.patch('/:id', async (ctx) => {
  const numUpdated = await Creature.query().findById(ctx.params.id).patch(ctx.request.body)
  ctx.body = {
    success: numUpdated == 1,
  }
})

router.delete('/:id', async (ctx) => {
  const numDeleted = await Creature.query().findById(ctx.params.id).delete()

  ctx.body = {
    success: numDeleted == 1,
  }
})

module.exports = router
