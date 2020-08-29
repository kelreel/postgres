var api = require('koa-router')()
const combineRouters = require('koa-combine-routers')
const moviesRouter = require('./movies')
const personRouter = require('./persons')
const raceRouter = require('./race')

api.use(moviesRouter)
api.use(raceRouter)
api.use(personRouter)

router.use('/', api.routes())

// const router = combineRouters(moviesRouter, personRouter, raceRouter)

module.exports = router
