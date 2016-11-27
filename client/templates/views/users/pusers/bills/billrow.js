Template.billRow.onRendered(function() {
    /*this.$('#formDateAdministered'+this.data.id).datetimepicker();*/
});


Template.billRow.helpers({
    formDateAdministered: function() {
        return moment(this.dateAdministered).format('LLLL');
    },
});

Template.billRow.events({
    'click .edit-bill-detail': function(event, template) {
        var billData = this;
        var recordId = Template.parentData(1)._id
        var _id = $(event.currentTarget).data('id');
        var billrow = {
            id: _id,
            date: $('#Date'+_id).val() != ''? new Date($('#Date'+_id).val()) : new Date(Data.date),
            consultationType: $('#consultationType'+_id).val() != ''? $('#consultationType'+_id).val() : billData.consultationType,
            amountType: $('#amount'+_id).val() != ''? $('#amount'+_id).val() : billData.amount
        }
        swal({
            title: 'Are you sure?',
            text: 'Please confirm editing this record',
            showCancelButton: true,
            allowEscapeKey: false,
            closeOnCancel: true,
            confirmButtonColor: "#DD6B55",
            closeOnConfirm: true,
            type: 'warning'
        }, function() {
            Meteor.call('editVaccination', vaccination, recordId, function(err, result) {
                if (err && err.error || !result.status) {
                    swal({
                        title: 'Error occured',
                        text: err.reason,
                        allowEscapeKey: false,
                        closeOnCancel: false,
                        closeOnConfirm: true,
                        type: 'error'
                    });
                } 
                else{
                    swal({
                        title: 'Edit succeeded',
                        text: 'You successfully modified bill',
                        allowEscapeKey:false,
                        closeOnCancel:false,
                        closeOnConfirm: true,
                        type:'info'
                    });
                }
            });
        });
    }
});
