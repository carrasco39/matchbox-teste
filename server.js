/**
 * Created by henri on 8/23/2017.
 */

var express = require('express');
var path = require('path');
var cons = require('consolidate');
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// view engine setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

///////

var conversation = watson.conversation({
    username: 'f303de7d-9a16-422b-832c-188fc560b893',
    password: '36FqdBIGEyiM',
    version: 'v1',
    version_date: '2017-05-26'
});


app.get('/',function (req, res) {
    res.render('index');
});

app.post('/send-message', function(req, res){
    console.log('posting');
    console.log(req.body.message);
    if(!!req.body.message){
        conversation.message({
            workspace_id: '1e57c1f9-2b68-422b-9cb7-27ccb1d5d45e',
            input: {'text': req.body.message}
        },  function(err, response) {
            if (err) {
                return err;
            }
            else {
                var json =JSON.stringify(response, null, 2);
                res.send(json);
            }
        });
    }

    //res.end();
});


var port = process.env.PORT || 8080;
////// RUN
app.listen(port, function(){
    console.log("App running on port 3000");
});
