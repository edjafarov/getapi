var metamodule = require("metamodule");
var fs = require('fs');
var path = require('path');

// init routes for source folder
module.exports.init = function(app, folder){
	var srcFiles = sourceFolderWalker(folder);
	for(var i =0 ; i< srcFiles.length; i++){
		var filepath = fs.realpathSync(srcFiles[i]);
        var meta = metamodule.getMeta(fs.readFileSync(filepath).toString());
        var reqFile = require(filepath);
		for(var name in meta){
			if(meta[name].annotations && meta[name].annotations["Route"]){
                var pathToRoute = "/" + name;
                
                var routeFunction = reqFile[name];
                if(meta[name].annotations["UrlMapping"]){
                    pathToRoute = meta[name].annotations["UrlMapping"].url;
                    routeFunction = routeFunctionGenerator(reqFile[name], 
                    meta[name].functionAssigned.args);
                }
                app.get(pathToRoute, routeFunction);
            }
		}
	};
	

	function sourceFolderWalker(rootpath){
                var filesList=[];
                function walker(path){
                    path+="/";
                    var locaDirFilesList = fs.readdirSync(path);
                    for(var i=0; i<locaDirFilesList.length;i++){
                        var stats = fs.statSync(path + locaDirFilesList[i]);
                        if(stats.isFile() && locaDirFilesList[i].lastIndexOf("\.js")!=-1){
                            filesList.push(path + locaDirFilesList[i]);
                        }else if(stats.isDirectory()){
                            walker(path + locaDirFilesList[i]);
                        }
                    }
                }
                walker(rootpath);
                return filesList;
            }
}


function routeFunctionGenerator(origFunction, argNamesArray){
    return function(req, res){
        var args = [req, res];
        for(var i = 2; i< argNamesArray.length; i++ ){
            args.push(req.query[argNamesArray[i]]||req.params[argNamesArray[i]]);
        }
        origFunction.apply(null, args);
    }
}

function normalize(path, keys, sensitive, strict) {
  if (path instanceof RegExp) return path;
  if (path instanceof Array) 
    path = '(' + path.join('|') + ')';
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
      keys.push({ name: key, optional: !! optional });
      slash = slash || '';
      return ''
        + (optional ? '' : slash)
        + '(?:'
        + (optional ? slash : '')
        + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
        + (optional || '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}