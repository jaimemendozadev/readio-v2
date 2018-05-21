const webpack_server = require('./webpack/server');
const webpack_frontend = require('./webpack/frontend');


let server_config = Object.assign({}, webpack_server);

let frontend_config = Object.assign({}, webpack_frontend);

module.exports = [
  server_config, frontend_config
];