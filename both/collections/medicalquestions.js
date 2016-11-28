Bills = new Mongo.Collection('medicalquestions');

Bills.before.insert(function (doc){
	doc.createAt = Date.now();
	doc.rating = 0;
});
