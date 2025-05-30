const { Router } = require('express');
const {
	getHistory,
	postHistory,
	getList,
	postAddMyList,
	getItsOnMyList,
	deleteMyList,
} = require('../controllers/userController');
const authenticateClerkUser = require('../middlewares/authenticateClerkUser');

const router = Router();

/**
 * {{url}}/api/user
 */

router.get('/history', authenticateClerkUser, getHistory);
router.post('/history', authenticateClerkUser, postHistory);
router.get('/my-list', authenticateClerkUser, getList);
router.get(
	'/my-list/its-on-my-list/:slug',
	authenticateClerkUser,
	getItsOnMyList
);
router.post('/my-list', authenticateClerkUser, postAddMyList);
router.delete('/my-list/:slug', authenticateClerkUser, deleteMyList);

module.exports = router;
