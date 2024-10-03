//create an instance of an event
const EventEmitter = require('events');
const LogEvents = require('./LogEvent.js');

const eventEmitter = new EventEmitter();


eventEmitter.on('logEvent',async(message) =>{
    await LogEvents(message);

});


setTimeout(() => {
    eventEmitter.emit('logEvent','new log event emitted'); 
}, 2000);