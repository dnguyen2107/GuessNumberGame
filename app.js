
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , service = require('./routes/service')
  , http = require('http')
  , path = require('path'),
    config = require('./server/config.js');

var random = require('secure_random');

var app = express();

// all environments
app.set('port', process.env.PORT || config.appPort);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/load', service.loadData);


service.loadData();
var codeList = service.list;

for(var i = 0; i < 40; i++) {
    codeList.push({code: 'LOSE'});
}

app.get('/request', function(req, res) {
    var totalReq = req.session.total;
    if(!totalReq) {
        totalReq = 0;
    }
    totalReq = totalReq + 1;
    req.session.total = totalReq;
    req.session.total = req.session.total || 1;
    res.contentType('json');
    if(totalReq >= config.maxTimeRequest) {
        res.send({ result: config.gameOver });
    }
    else {

        random.getRandomInt(0, 49, function(err, value) {
                if(codeList[value].code == 'LOSE')
                    res.send({ result: codeList[value].code});
                else {
                    res.send({ result: 'WIN ' + codeList[value].code});
                }
            }
        );

    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
