const UsersController = require('../controllers/usersController');
const passport = require('passport'); //15-2

module.exports = (app, upload) => {
    // TRAER DATOS OBTENER DATOS
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id',passport.authenticate('jwt', {session: false}), UsersController.findById);// passport.authenticate('jwt', {session: false}),

    // GUARDAR O CREAR DATOS    
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);

    //ACTUALIZAR DATOS
    app.put('/api/users/update', upload.array('image', 1),passport.authenticate('jwt', {session: false}), UsersController.update)//passport.authenticate('jwt', {session: false})
    
} 