const router = require('express').Router();
const movieRouter = require('./movieRouter');
const tvSeriesRouter = require('./tvSeriesRouter');

// router.get('/', function(req, res) {
//     redis.set('test', 'tost');
//     res.send('masuk')
// });
router.use('/movies', movieRouter);
router.use('/tvseries', tvSeriesRouter);

module.exports = router;