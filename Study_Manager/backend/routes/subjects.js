const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('subjects router');
});

module.exports = router;