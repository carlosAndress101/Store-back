const cors = require('cors');
const express = require('express');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');


/**Main app general project */
const app = express();
app.use(express.json());



// Configura CORS
app.use(cors());



/**stratety auth */
require('./auth/index');



/**Route test middleware */
app.get('/newroute', checkApiKey, (req, res)=>{
  res.send('soy una nueva ruta')
})

app.get('/', (req, res)=>{
  res.send('Ready')
})




/*function that use router */
routerApi(app);


/**Globals Middleware*/
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler)
app.use(errorHandler);


module.exports = app;
