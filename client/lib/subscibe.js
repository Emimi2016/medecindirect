Meteor.startup(function(){
    Meteor.subscribe("usermessages");
});

Tracker.autorun(function () {
    Meteor.subscribe("medicalSpecialities");
    Meteor.subscribe("userData");
    Meteor.subscribe("labels");
    Meteor.subscribe('patients');

});
