/*const fs = require('fs');
const util = require('util');
const fileLog = fs.createWriteStream(__dirname + '/server.log', {flags : 'w'});
const ErrorLog = fs.createWriteStream(__dirname + '/Error.log', {flags : 'w'});
const logOutput = process.stdout;
// the flag 'a' will update the stream log at every launch
console.log  = (e) => {
fileLog.write(util.format(e) + '\n');
logOutput.write(util.format(e) + '\n');
};


console.error = (e) => {
ErrorLog.write(util.format(e) + '\n');
}


module.exports = {console}*/
const options = {
    folderPath: './logs/',
    dateBasedFileNaming: true,
    fileNamePrefix: 'DailyLogs_',
    fileNameExtension: '.log',    
    dateFormat: 'YYYY_MM_D',
    timeFormat: 'h:mm:ss A',
  }
log.SetUserOptions(options); 