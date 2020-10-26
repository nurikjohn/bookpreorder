const { Router } = require('express');
const preorder = require('../controllers/preorder');

const router = Router();

router.get('/', preorder.getAll);
router.get('/:id', preorder.get);
router.post('/', preorder.create);
router.patch('/:id', preorder.update);
router.delete('/:id', preorder.delete);

module.exports = router;
