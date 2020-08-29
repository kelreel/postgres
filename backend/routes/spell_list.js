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

module.exports = router
