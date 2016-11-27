Template.leftMailPanel.onRendered(function() {
  // console.log('left panel ' + this.parent);
});

Template.leftMailPanel.helpers({
  nbInbox: function() {
    var usermessages = UserMessages.find({
      revicerId: Meteor.userId(),
      isRead: false
    }, {
      limit: 50,
      sort: {
        date: -1
      }
    }).fetch();
    return usermessages.length;
  },
  nbSent: function() {
    var usermessages = UserMessages.find({
      userId: Meteor.userId(),
      isRead: false
    }, {
      limit: 50,
      sort: {
        date: -1
      }
    }).fetch();
    return usermessages.length;
  },
  inboxClass: function() {
    return this.parent == "mailbox" ? "active" : "";
  },
  sentClass: function() {
    return this.parent == "mailsent" ? "active" : "";
  },
  draftClass: function() {
    return this.parent == "maildraft" ? "active" : "";
  },
  trashClass: function() {
    return this.parent == "mailtrash" ? "active" : "";
  },
  labels: function() {
    var user = Meteor.user();
    if (user) {
      var labels = Meteor.user().labels;
      return labels;
    }

    return undefined;
  }
});


Template.leftMailPanel.events({
  'click #linkAddLabel': function(event, template) {
    event.preventDefault();
    Modal.show('addLabelModal');
  },
  'click #linkEditLabel': function(event, template) {
    event.preventDefault();
    Modal.show('editLabelModal');
  }
});
