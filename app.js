var express = require('express');
var routes = require('./routes/index');
var app = module.exports = express();

//config
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('env', process.env.NODE_ENV || 'dev');

//static content
app.use('/static', express.static(__dirname + '/dist'));

//routes
app.get('/', routes.index);

//only start server if called from command line
if (require.main === module) {
    app.listen(app.get('port'), function() {
        console.log('[' + app.get('env') + '] Server listening on port ' + app.get('port'));
    });
}
