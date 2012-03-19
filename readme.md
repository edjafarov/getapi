# getapi - simpliest way to build API
## example
Just add some comments for API to fly

```javascript
/**
* @Route 
* @UrlMapping (url = '/apicall/math/add')
*/
module.exports.add = function(req, res, a, b){
	res.json({result:(parseFloat(a)+parseFloat(b))});
}
```

## install
```
$npm install getapi -g
```

## use

1) Create you node.js files in some folder.
2) Place comments 

* ```@Route``` - means that this function should handle api call. 
* ```@UrlMapping (url = '[url]')``` allows you to assign url for the function. You can assign url's in usual express manner with named placeholders. But unlike express if you will name one of arguments of a function same as placeholder function this argument will be resolved.

```javascript
/**
* @Route 
* @UrlMapping (url = '/apicall/math/pow/:num')
*/
module.exports.pow = function(req, res, a, num){ //num will be resolved to the value of placeholder
	res.json({result:(Math.pow(parseFloat(a),parseFloat(num)))});
}
```

3) ```$ getapi --dir=[path-to-folder] --port=[port]``` 
(if you run ```getapi``` without args default will use current folder and 80 port - aware that in linux to use 80 port you need to be sudo)

4) that's it!

OR

use it programmatically

```javascript
var express = require('express');
var getapi = require('getapi');

var app = express.createServer();

var app = express.createServer(
  express.favicon()
);

app.configure(function() {
	getapi.init(app,"./apis")// initialize routes for API's
    app.set('views', __dirname + "/");
    app.set('view engine', 'ejs');
});

app.get("/",function(req, res){
	res.render('public/homepage.ejs');
});

app.listen(3000);
```

## License

MIT

