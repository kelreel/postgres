const Router = require('koa-router')
const router = new Router({ prefix: '/hero' })
const Hero = require('../models/Hero')

router.get('/', async (ctx) => {
  const hero = await Hero.query()
  ctx.body = hero
})

router.post('/', async (ctx) => {
  const hero = await Hero.query().insert(ctx.request.body)
  ctx.body = hero
})

module.exports = router
