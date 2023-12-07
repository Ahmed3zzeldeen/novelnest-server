const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const upload = require('../utils/multerConfig');

router.route('/signup')
            .post(usersController.signup)

router.route('/login')
            .post(usersController.login)


router.route('/')
            .get(verifyToken, allowedTo(userRoles.ADMIN) , usersController.getAllUsers)

router.route('/:id')
            .get(verifyToken, allowedTo(userRoles.ADMIN) , usersController.getUserById)
            .delete(verifyToken, allowedTo(userRoles.ADMIN), usersController.deleteUserById)
            .patch(verifyToken, upload.single('avatar'), usersController.updateUserById) // HINT: only same user can update his profile

router.route('/role/:id')
            .patch(verifyToken, allowedTo(userRoles.ADMIN), usersController.updateUserRoleById)

module.exports = router;