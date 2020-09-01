const Router = require('koa-router')
const router = new Router({ prefix: '/army' })
const Army = require('../models/Army')

router.get('/', async (ctx) => {
  const army = await Army.query()
  ctx.body = army
})

router.post('/', async (ctx) => {
  const army = await Army.query().insert(ctx.request.body).orderBy('id')
  ctx.body = army
})

router.patch('/:id', async (ctx) => {
  const numUpdated = await Army.query().findById(ctx.params.id).patch(ctx.request.body)
  ctx.body = {
    success: numUpdated == 1,
  }
})

router.delete('/:id', async (ctx) => {
  const numDeleted = await Army.query().findById(ctx.params.id).delete()

  ctx.body = {
    success: numDeleted == 1,
  }
})

module.exports = router
