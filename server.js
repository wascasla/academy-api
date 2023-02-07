const http = require("http");
const app = require("./app");
const db = require("./models");

const port = 5000;
const server = http.createServer(app);

db.sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

server.listen(port, () => {
    console.log(`server running in port ${port}`);
});
