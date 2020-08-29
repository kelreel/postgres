const Router = require('koa-router')
const router = new Router({ prefix: '/spell_list' })
const SpellList = require('../models/SpellList')

router.get('/', async (ctx) => {
  const spell_list = await SpellList.query()
  ctx.body = spell_list
})

router.post('/', async (ctx) => {
  const spell_list = await SpellList.query().insert(ctx.request.body)
  ctx.body = spell_list
})

router.patch('/:id', async (ctx) => {
  const numUpdated = await SpellList.query().findById(ctx.params.id).patch(ctx.request.body)
  ctx.body = {
    success: numUpdated == 1,
  }
})

router.delete('/:id', async (ctx) => {
  const numDeleted = await SpellList.query().findById(ctx.params.id).delete()

  ctx.body = {
    success: numDeleted == 1,
  }
})

module.exports = router
