var pool = require('../../config/pool.js');


module.exports = {

  list: function(req, res, next) {

    var sql = "select * from user";

    pool(sql).then(function(data){
        return res.json(data);

    });

  }

};
