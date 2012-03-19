/**
* @Route 
* @UrlMapping (url = '/apicall/math/add')
*/
module.exports.add = function(req, res, a, b){
	res.json({result:(parseFloat(a)+parseFloat(b))});
}

/**
* @Route 
* @UrlMapping (url = '/apicall/math/multiply')
*/
module.exports.multiply = function(req, res, a, b){
	res.json({result:(parseFloat(a)*parseFloat(b))});
}

/**
* @Route 
* @UrlMapping (url = '/apicall/math/pow2')
*/
module.exports.pow2 = function(req, res, a){
	res.json({result:(Math.pow(parseFloat(a),2))});
}

/**
* @Route 
* @UrlMapping (url = '/apicall/math/pow/:num')
*/
module.exports.pow = function(req, res, a, num){
	res.json({result:(Math.pow(parseFloat(a),parseFloat(num)))});
}