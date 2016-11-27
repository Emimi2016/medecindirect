Meteor.publish('bill', function() {
    return Bill.find();
});
