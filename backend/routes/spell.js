const Router = require('koa-router')
const router = new Router({ prefix: '/spell' })
const Spell = require('../models/Spell')

router.get('/', async (ctx) => {
  const spell = await Spell.query().orderBy('id')
  ctx.body = spell
})

router.post('/', async (ctx) => {
  const spell = await Spell.query().insert(ctx.request.body)
  ctx.body = spell
})

router.patch('/:id', async (ctx) => {
  const numUpdated = await Spell.query().findById(ctx.params.id).patch(ctx.request.body)
  ctx.body = {
    success: numUpdated == 1,
  }
})

router.delete('/:id', async (ctx) => {
  const numDeleted = await Spell.query().findById(ctx.params.id).delete()

  ctx.body = {
    success: numDeleted == 1,
  }
})

module.exports = router
