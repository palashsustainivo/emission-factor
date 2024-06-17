// Used to connect to the database
const Sequelize = require("sequelize");
const env = require("dotenv");
env.config();
//onst sql = require("mssql/msnodesqlv8");
//const SequelizeMSSQL = require('sequelize-msnodesqlv8');

const DB_HOST = process.env.DB_HOST;
//const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
//const DB_SERVER = process.env.DB_SERVER;
//const DB_DRIVER = process.env.DB_DRIVER;
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  timezone: process.env.DB_TIMEZONE, 
  host: DB_HOST,
  logging: false, // Disable logging
});

// const connectionString = 'Driver={SQL Server};Server=DESKTOP-1A1I5SR\\SQL_SERVER;Database=pdp_esg;Uid=sa;Pwd=@Palash123;Trusted_Connection=no;';
// const config = {
//   connectionString: connectionString,
//   options: {
//     //trustedConnection: true,
//     encrypt: false, // for local SQL Server, you might not need encryption
//     enableArithAbort: true
//   },
// };
// const db = sql.connect(config, function (err) {
//   if (err) throw err;
//   console.log("Connected to the database");
// });

// const sequelize = new Sequelize('pdp_esg', 'sa', '@Palash123', {
//   dialect: 'mssql',
//   dialectModule: SequelizeMSSQL,
//   dialectOptions: {
//     driver: 'msnodesqlv8',
//     connectionString: connectionString,
//   }
// });
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
//sequelize.sync()
export default sequelize;
