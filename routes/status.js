const { Router } = require('express');
const status = require('../controllers/status');

const router = Router();

router.get('/', status.getAll);
router.get('/:id', status.get);
router.post('/', status.create);
router.patch('/:id', status.update);
router.delete('/:id', status.delete);

module.exports = router;
