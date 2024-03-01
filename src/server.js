// server.js
const http = require('http');
const app = require('./app');

const config = require('./config');

const server = http.createServer(app);


server.listen(config.PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + config.PORT);
    else
        console.log("Server can't start", error);
}
); 
