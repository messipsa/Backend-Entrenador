const router = require('express').Router();
const authController = require('../controllers/auth.controller');

const userController = require('../controllers/user.controller');

//auth
router.post('/register' , authController.signUp);

//user display
router.get('/' , userController.getAllUsers);

router.get('/:id' , userController.userInfo);

router.put('/:id' , userController.updateUser);

module.exports = router;