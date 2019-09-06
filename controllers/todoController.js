var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://saahil:saahil@saahil-m002-gjroi.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});

//create a schema - this is a blueprint
var todoSchema = new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo', todoSchema);
//var itemOne = Todo({}).save(function(err){
//  if (err) throw err;
  //console.log('item saved');
//})

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  //getting data from mongodb
  Todo.find({}, function(err, data){
    if (err) throw err;
  res.render('todo', {todos: data});
});
});

app.post('/todo', urlencodedParser, function(req, res){
  //get data and add to mongodb
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item', function(req, res){
  //delete the requested item
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
    if (err) throw err;
    res.json({todos:data});
  });
});
}
