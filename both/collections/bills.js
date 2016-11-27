Bills = new Mongo.Collection('bills');

Bills.before.insert(function (doc){
	doc.createAt = Date.now();
	doc.rating = 0;
});
