// import app from "./app.js";


// //"Configuracion"
// app.set("port", process.env.PORT || 3000);
// app.listen(app.get("port"),()=>{
//     console.log("Servidor en puerto:",app.get("port"))
// })



// app.use((req, res, next) => {
//     next();
// });

import https from 'https';
import fs from 'fs';
import http from 'http';
import app from "./app.js";

const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};

const serverHTTP = http.createServer(app).listen(4000, () => {
  console.log('Servidor HTTP en puerto 3000');
});

const serverHTTPS = https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS en puerto 443');
});
