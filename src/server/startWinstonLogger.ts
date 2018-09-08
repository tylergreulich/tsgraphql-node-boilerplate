import * as winston from 'winston';

export const startWinstonLogger = () => {
  process.on('uncaughtException', ex => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', ex => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(
    new winston.transports.File({
      filename: 'logfile.log'
    })
  );
};
