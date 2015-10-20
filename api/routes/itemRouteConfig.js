function itemRouteConfig(app){
	this.app = app;
	this.routeTable = [];
	this.init();
}

itemRouteConfig.prototype.init = function(){
	var self = this;
	this.addRoutes();
}

itemRouteConfig.prototype.processRoutes = function(){
	var self = this;
	self.routeTable.forEach(function(route){
		if (route.requestType == 'get'){
			self.app.get(route);requestUrl,route.callbackFunction);
		}
		else if (route.requestType == 'post'){}
		else if (route.requestType == 'delete'){}
	});
}

itemRouteConfig.prototype.addRoutes = function(){
	var self = this;
	self.routeTable.push({
		requestType : 'get',
		requestUrl : '/#/First',
		callbackFunction : function(req,res){
			response.render('First',{title : "First"});
		}
	});
}

module.exports = itemRouteConfig;