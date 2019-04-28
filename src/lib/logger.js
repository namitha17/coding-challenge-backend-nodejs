const winston = require('winston');
const path = require('path');
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
//     filename: path.resolve(__dirname, '../../info.log')',
//     level: 'info'
// });

const constructMyFormat = winston.format(info => {
  if (info.meta && info.meta instanceof Error) {
      info.message = `${info.message} ${info.meta.stack}`;
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
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../info.log'),
      level: 'info'
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../info.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../info.log'),
      level: 'warn'
    })
  ]
});

module.exports = {
  logger
};
