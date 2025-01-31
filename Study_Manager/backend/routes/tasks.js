const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('tasks router');
});

module.exports = router;