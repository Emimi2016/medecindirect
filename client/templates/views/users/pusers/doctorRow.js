Template.doctorRow.events({
    'click .sendRequest': function(event, template) {
        console.log('request has been sent');
        var docId = $(event.currentTarget).data('id');
        Meteor.call('sendRequest', docId, function(err, success) {
            if (err && err.error) {
                console.log(err);
                swal({
                    title: 'Error occured',
                    text: err.reason,
                    allowEscapeKey: false,
                    closeOnCancel: false,
                    closeOnConfirm: true,
                    type: 'error'
                });
            } else {
                swal({
                    title: 'Request is sent',
                    text: 'Your request is sent to the doctor.',
                    allowEscapeKey:false,
                    closeOnCancel:false,
                    closeOnConfirm: true,
                    type:'info'
                });
            }
        });
    }
});
