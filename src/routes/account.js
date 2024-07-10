const { Router } = require('express');
const {
	getAccounts,
	getAccount,
	postAccount,
	putAccount,
	deleteAccount,
} = require('../controllers/account');

const router = Router();

/**
 * {{url}}/api/account
 */

router.get('/', getAccounts);

router.get('/:id', getAccount);

router.post('/', postAccount);

router.put('/:id', putAccount);

router.delete('/:id', deleteAccount);

module.exports = router;
