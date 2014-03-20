
var config = require('../server/config');

var mongoose = require('mongoose'),
    WinCode = require('../server/data/WinCode').WinCode,
    codeList = [];

/*
 * load data from database
 */
var arr = [];

exports.list = arr;

exports.loadData = function(){
    // VLAD: db == connection?
    var db = mongoose.connect('mongodb://' + config.coreDatabase.host + ':' + config.coreDatabase.port + '/'
        + config.coreDatabase.name, function(err){
                    if(err) {
                        console.log(err);
                    }
    }).connection;
    
    db.once('open', function callback () {
        WinCode.find(function(err, codes) {
            if(err) {
                console.log(err);
            }
            else {
                codes.forEach(function(code) {
                    arr.push(code);
                });
            }
        });
    });
};