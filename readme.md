# getapi - simpliest way to build API
## example
Just add some comments for API to fly
```
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
$npm install getapi
```

## use

It is just one more line in your express app.
check examples

## License

MIT
