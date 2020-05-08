const router = require('express').Router();
const movieRouter = require('./movieRouter');
const tvSeriesRouter = require('./tvSeriesRouter');
const Controller = require('../controllers/Controller');

router.get('/entertainme', Controller.getAll);
router.use('/movies', movieRouter);
router.use('/tvseries', tvSeriesRouter);

module.exports = router;