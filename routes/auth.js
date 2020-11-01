const { Router } = require('express');
const auth = require('../controllers/auth');

const router = Router();

router.get('/login/:password', auth.login);

module.exports = router;
