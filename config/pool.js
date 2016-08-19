var mysqldb = require('./mysql.js');
var pool = mysqldb('pool');

function execQuery(sql, data, callback) {
        var errinfo;

        pool.getConnection(function(err, connection) {
            if (err) {
                errinfo = 'DB-获取数据库连接异常！';
                throw errinfo;
            } else {
                var querys = connection.query(sql, data, function(err, rows) {
                    release(connection);
                    if (err) {
                        errinfo = 'DB-SQL语句执行错误:' + err;
                        callback(err);
                    } else {
                        callback(null,rows);
                    }
                });
            }
        });
    }

    function release(connection) {
        try {
            connection.release(function(error) {
                if (error) {
                    console.log('DB-关闭数据库连接异常！');
                }
            });
        } catch (err) {}
    }

module.exports = function(sql, data){
    data = data ? data : []
    //对外接口返回Promise函数形式
    return new Promise(function(resolve, reject){
        execQuery(sql, data, function(err, rows){
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    });
}