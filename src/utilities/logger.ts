export default function(winston:any):any {
  const tsFormat:any = ():any => (new Date()).toLocaleTimeString();
  const logger:typeof winston = new (winston.Logger)({
    transports: [
      // colorize the output to the console
      new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        level: 'info'
      }),
      new (winston.transports.File)({
        filename: `logs.txt`,
        timestamp: tsFormat,
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
      })
    ]
  });

  return logger;
}