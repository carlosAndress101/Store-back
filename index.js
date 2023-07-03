const app = require('./app')


const port = process.env.PORT || 3000;


app.listen(port, ()=>{
  console.log(`Server on port: ${port}`)
})

 // Mantener el proceso en ejecución
// function keepAlive() {
//   setInterval(() => {
//     console.log('El backend sigue en ejecución...');
//   }, 60000);
// }

// keepAlive();
