const router = require("express").Router();


router.get('/:id', async (req, res) => {
    res.render('game', {level: req.params.id})
})

module.exports = router