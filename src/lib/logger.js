const winston = require('winston');
// let transports;
//
// if(process.env.NODE_ENV === 'dev'){
//   transports = new winston.transports.Console();
// }else{
//   transports = new winston.transports.File({
//       filename: stolen_bike_service_logs.log
//   });
// }
//
// transports = new winston.transports.File({
//     filename: __dirname + '../lib/../src/../stolen_bike_service_logs.log',
//     level: 'info'
// });

const constructMyFormat = winston.format(info => {
  if (info.meta && info.meta instanceof Error) {
      info.message = `[${info.timestamp}] ${info.message} ${info.meta.stack}`;
  }
  return info;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    constructMyFormat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: './info.log',
      level: 'info'
    })
  ]
});

module.exports = {
  logger
};
