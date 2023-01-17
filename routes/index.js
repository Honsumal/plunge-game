const router = require('express').Router();

const landingRoutes = require('./landing-routes.js');
const gameRoutes = require('./game-routes.js');

router.use('/', landingRoutes);
router.use('/game', gameRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });
  
  module.exports = router;