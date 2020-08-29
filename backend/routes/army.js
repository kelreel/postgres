const Router = require('koa-router')
const router = new Router({ prefix: '/army' })
const Army = require('../models/Army')

router.get('/', async (ctx) => {
  const army = await Army.query()
  ctx.body = army
})

router.post('/', async (ctx) => {
  const army = await Army.query().insert(ctx.request.body)
  ctx.body = army
})

module.exports = router
