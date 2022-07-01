const express = require('express');
const app = express();
const http = require ('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');   

/*
 INICIALIZAR FIREBASEA ADMIN
*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)

})

const upload = multer({
    storage: multer.memoryStorage()
})

/*
/ RUTAS
*/
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');



const port = process.env.PORT || 3000;

var session = require('express-session');
app.use(session({ secret: 'SECRET' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.disable('x-powered-by');

app.set('port', port);

/*
* llamando a las rutas
*/

users(app, upload);
categories(app);
products(app, upload);

server.listen(3000, '192.168.1.3' || 'localhost', function(){
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});



// ERROR HANDLER

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});  


module.exports = {
    app: app,
    server: server
}

// 200 ES UNA RESP EXITOSA
// 404 SIGNIFICA QUE LA URL NO EXISTS
//500 ERROR INTERNO DEL SERVIDOR 