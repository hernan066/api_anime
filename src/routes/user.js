const { Router } = require('express');
const {
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser,
	getAccountUsers,
} = require('../controllers/user');

const router = Router();

/**
 * {{url}}/api/user
 */

router.get('/', getUsers);

router.get('/accountUsers/:id', getAccountUsers);

router.get('/:id', getUser);

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
