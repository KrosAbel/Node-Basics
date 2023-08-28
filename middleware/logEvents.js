const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = async (message,logName)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logitem=`${dateTime}\t${uuid()}\t${message}\n`
    console.log(logitem)
    try{

        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logitem)
    }
    catch(e){
        console.error(e);
    }
}

const logger=(req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports={logger,logEvents};