const Router = require('koa-router')
const router = new Router({ prefix: '/hero' })
const Hero = require('../models/Hero')

router.get('/', async (ctx) => {
  const hero = await Hero.query()
  ctx.body = hero
})

router.get('/:id', async (ctx) => {
  const hero = await Hero.query().findById(ctx.params.id)
  if (!hero) ctx.status = 404
  ctx.body = hero
})

router.get('/:id/army', async (ctx) => {
  const hero = await Hero.relatedQuery('army')
    .select(
      'army.id',
      'creature.id as creatureId',
      'creature.name',
      'creature.raceId',
      'creature.hp',
      'army.count'
    )
    .for(ctx.params.id)
  ctx.body = hero
})

router.get('/:id/spells', async (ctx) => {
  const hero = await Hero.relatedQuery('spell')
    .select('spell_list.id', 'spell.name', 'spell.description', 'spell.mp')
    .for(ctx.params.id)
  ctx.body = hero
})

router.post('/', async (ctx) => {
  const hero = await Hero.query().insert(ctx.request.body)
  ctx.body = hero
})

router.patch('/:id', async (ctx) => {
  const numUpdated = await Hero.query().findById(ctx.params.id).patch(ctx.request.body)
  ctx.body = {
    success: numUpdated == 1,
  }
})

router.delete('/:id', async (ctx) => {
  const numDeleted = await Hero.query().findById(ctx.params.id).delete()

  ctx.body = {
    success: numDeleted == 1,
  }
})

module.exports = router
