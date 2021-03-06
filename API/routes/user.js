const router = require('express').Router();
const userController = require('../controllers/usercontroller');
// const service = require('../middleware/service');

router.post('/', userController.addUser); // Añadir usuario
router.put('/:username', userController.editUser); // EDITAR usuario

router.post('/login', userController.logIn); // USER LOGIN

router.post('/seguir/:email', userController.seguir); // EMAIL SIGUE A BODY

router.get('/:email', /* service.checkToken, */ userController.getUser); // GET DE UN USUARIO

// REQUIEREN MIDDLEWARE QUE COMPRUEBE SI ES ADMIN
router.get('/', /* service.isAdmin, */ userController.getUsers); // GET de todos los users

module.exports = router;
