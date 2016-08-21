var mysql = require('mysql');
var config = require('./config.js');

module.exports = function(option){

    var db_config = config.mysql;

    var connection;

    function handleDisconnect() {  

        connection = mysql.createConnection(db_config);

        connection.connect(function(err) {
            if(err) {
                console.log('error when connecting to db:', err);  
                setTimeout(handleDisconnect, 2000);
            }
        });

        connection.on('error', function(err) {  
            console.log('db error', err);  
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            } 
        });  
    }  

    // handleDisconnect(); 

    var pool;

    function poolHandleDisconnect(){
        pool = mysql.createPool(db_config);
    }

    console.log('mysql connection');


    if(option == 'pool'){
        poolHandleDisconnect();
        return pool;
    }
    else{
        handleDisconnect(); 
        return connection;
    }

}

