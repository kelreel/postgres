const Router = require('koa-router')
const router = new Router({ prefix: '/movies' })

/**
 * Insert a new movie.
 */
router.post('/', async (ctx) => {
  const movie = await Movie.query().insert(ctx.request.body)
  ctx.body = movie
})

/**
 * Add existing Person as an actor to a movie.
 */
router.post('/:movieId/actors/:personId', async (ctx) => {
  const numRelated = await Movie.relatedQuery('actors')
    .for(ctx.params.movieId)
    .relate(ctx.params.personId)

  ctx.body = {
    success: numRelated == 1,
  }
})

/**
 * Remove a connection between a movie and an actor. Doesn't delete
 * the movie or the actor. Just removes their connection.
 */
router.delete('/:movieId/actors/:personId', async (ctx) => {
  const numUnrelated = await Movie.relatedQuery('actors')
    .for(ctx.params.movieId)
    .unrelate()
    .where('persons.id', ctx.params.personId)

  ctx.body = {
    success: numUnrelated == 1,
  }
})

/**
 * Get Movie's actors.
 */
router.get('/:id/actors', async (ctx) => {
  const actors = await Movie.relatedQuery('actors').for(ctx.params.id)
  ctx.body = actors
})

module.exports = router
