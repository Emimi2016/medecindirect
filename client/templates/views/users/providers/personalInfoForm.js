Template.personalInformation.onCreated(function() {
    var self = this;
    self.addingNewUser = new ReactiveVar(false);
    self.identity = new ReactiveVar(null);
    self.autorun(function() {
        if (Template.currentData()) {
            self.identity.set(Template.currentData().persodata.identity);
        } else {
            self.addingNewUser.set(true);
        }
    });
});

Template.personalInformation.onRendered(function(){
    // $('.i-checks').iCheck({
    //     checkboxClass: 'icheckbox_square-green',
    //     radioClass: 'iradio_square-green'
    // });
    var defaultDate = function() {
        if (Template.currentData()) {
            return Template.currentData().persodata.dob === null ? moment().format('YYYY-MM-DD') : Template.currentData().persodata.dob;
        } else {
            return moment().format('YYYY-MM-DD');
        }
    }
    this.$("#birthday").birthdayPicker({
        "defaultDate": defaultDate(),
        "placeholder": true,
    	"maxAge": 100,
        "dateFormat" : "bigEndian",
    	"monthFormat":"long",
    	"sizeClass": "span3"
    });
    this.$("#nhsNumber").mask("999-999-9999");
    this.$('input[name="workingDays"]').each(function(index) {
        var checked = $(this).prop('checked'),
            dayId = $(this).prop('id'),
            hoursRowId = ['#', dayId, '-workingHours'].join('');
        if (checked) {
            $(hoursRowId).removeClass('hidden');
        }
    });
    this.$('.clockpicker').clockpicker();
    function checkAge() {
        var year = $('[name="birthday_birth[year]"]').val(),
            month = $('[name="birthday_birth[month]"]').val() - 1,
            day = $('[name="birthday_birth[day]"]').val(),
            dateOfBirth = new Date(year, month, day),
            today = new Date(),
            age = today.getFullYear() - dateOfBirth.getFullYear(),
            m = today.getMonth() - dateOfBirth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
            age--;
        }
        $('#age').val(age);
        if (parseInt(age) < 18) {
            $('#minor').removeClass('hidden');
        } else {
            $('#minor').addClass('hidden');
        }
    }

    $('[name="birthday_birth[year]"]').on('change', checkAge);
    $('[name="birthday_birth[month]"]').on('change', checkAge);
    $('[name="birthday_birth[day]"]').on('change', checkAge);
    $('[name="birthday_birth[year]"]').trigger('change');

    $.validator.addMethod("nhsNumber", function(value, element) {
        return this.optional(element) || /^(\d\d\d)-(\d\d\d)-(\d\d\d\d)$/.test(value);
    }, "Please specify the correct NHS number");
    $("#perso-provider-form").validate({
        rules: {
            "birthday_birth[year]": {
                required: true,
                // notEqualTo: "0"
            },
            "birthday_birth[month]": {
                // notEqualTo: "0"
            },
            "birthday_birth[day]": {
                // notEqualTo: "0"
            },
            "nhsNumber": {
                nhsNumber: true
            }
       }
   });
});

Template.personalInformation.events({
    'submit #perso-provider-form': function(event, template) {
        event.preventDefault();
        var form = event.target;
        console.log(this._id);
        console.log('sunday ' + form.sunday);
        if (template.addingNewUser.get()) {
            console.log('adding new user');
            template.identity.set(1);
        }
        if (template.identity.get() == 1) {
            var year = form['birthday_birth[year]'].value,
            month = form['birthday_birth[month]'].value,
            day = form['birthday_birth[day]'].value;
            if (year != 0 && month != 0 && day != 0) {
                var dob = new Date([year, '-', month, '-', day,].join(''));
            }
            var workTime = '';
            var email = form.email ? form.email.value : '';
            var skype = form.skype ? form.skype.value : '';
        } else {
            var email = Meteor.user().emails[0].address;
            var skype = Meteor.user().skypes[0].address;
            var workTime = {
                sunday: {
                    dayNumber: form.sunday.value,
                    isWorkDay: form.sunday.checked,
                    from: form.sundayFrom.value,
                    to: form.sundayTo.value,
                    from2: form.sundayFrom2.value,
                    to2: form.sundayTo2.value,
                    from3: form.sundayFrom3.value,
                    to3: form.sundayTo3.value
                },
                monday: {
                    dayNumber: form.monday.value,
                    isWorkDay: form.monday.checked,
                    from: form.mondayFrom.value,
                    to: form.mondayTo.value,
                    from2: form.mondayFrom2.value,
                    to2: form.mondayTo2.value,
                    from3: form.mondayFrom3.value,
                    to3: form.mondayTo3.value
                },
                tuesday: {
                    dayNumber: form.tuesday.value,
                    isWorkDay: form.tuesday.checked,
                    from: form.tuesdayFrom.value,
                    to: form.tuesdayTo.value,
                    from2: form.tuesdayFrom2.value,
                    to2: form.tuesdayTo2.value,
                    from3: form.tuesdayFrom3.value,
                    to3: form.tuesdayTo3.value
                },
                wednesday: {
                    dayNumber: form.wednesday.value,
                    isWorkDay: form.wednesday.checked,
                    from: form.wednesdayFrom.value,
                    to: form.wednesdayTo.value,
                    from2: form.wednesdayFrom2.value,
                    to2: form.wednesdayTo2.value,
                    from3: form.wednesdayFrom3.value,
                    to3: form.wednesdayTo3.value
                },
                thursday: {
                    dayNumber: form.thursday.value,
                    isWorkDay: form.thursday.checked,
                    from: form.thursdayFrom.value,
                    to: form.thursdayTo.value,
                    from2: form.thursdayFrom2.value,
                    to2: form.thursdayTo2.value,
                    from3: form.thursdayFrom3.value,
                    to3: form.thursdayTo3.value
                },
                friday: {
                    dayNumber: form.friday.value,
                    isWorkDay: form.friday.checked,
                    from: form.fridayFrom.value,
                    to: form.fridayTo.value,
                    from2: form.fridayFrom2.value,
                    to2: form.fridayTo2.value,
                    from3: form.fridayFrom3.value,
                    to3: form.fridayTo3.value
                },
                saturday: {
                    dayNumber: form.saturday.value,
                    isWorkDay: form.saturday.checked,
                    from: form.saturdayFrom.value,
                    to: form.saturdayTo.value,
                    from2: form.saturdayFrom2.value,
                    to2: form.saturdayTo2.value,
                    from3: form.saturdayFrom3.value,
                    to3: form.saturdayTo3.value
                }
            }
        }
        var persodata = {
            fname: form.firstName ? form.firstName.value : '',
            lname: form.lastName ? form.lastName.value : '',
            maidenName: form.maidenName ? form.maidenName.value : '',
            jobTitle: form.jobTitle ? form.jobTitle.value : '',
            gender: form.gender ? $('input[name=gender]:radio:checked').val() : '', // fix for IE: use old jquery selector
            dob: dob ? dob : '',
            mothersName: form.mothersName ? form.mothersName.value : '',
            fathersName: form.fathersName ? form.fathersName.value : '',
            speciality: form.speciality ? form.speciality.value : '',
            country: form.Country ? form.Country.value : '',
            language: form.language ? form.language.value : '',
            address: form.address ? form.address.value : '',
            postalCode: form.postalCode ? form.postalCode.value : '',
            city: form.city ? form.city.value : '',
            addressArea: form.addressArea ? form.addressArea.value : '',
            mobileNumber: form.mobileNumber ? form.mobileNumber.value : '',
            homeNumber: form.homeNumber ? form.homeNumber.value : '',
            nhsNumber: form.nhsNumber ? form.nhsNumber.value : '',
            emergencyName: form.emergencyName ? form.emergencyName.value : '',
            emergencyNumber: form.emergencyNumber ? form.emergencyNumber.value : '',
            weight: form.weight ? form.weight.value : '',
            height: form.height ? form.height.value : '',
            email: email,
            skype: form.skype ? form.skype.value : '',
            workTime: workTime,
            amount: form.amount ? form.amount.value : '',
        }
        if (Meteor.userId() != this._id) {
            persodata['patientId'] = this._id;
        }
        if (template.addingNewUser.get()) {
            persodata['newUser'] = true;
            persodata['identity'] = 1;
        } else {
            persodata['newUser'] = false;
        }
        console.log(persodata.newUser);
        Meteor.call('createOrUpdateProviderProfile', persodata, function(err, result) {
            if (err && err.error) {
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
                    title: 'Create succeeded',
                    text: 'Your personal data has been modified.',
                    allowEscapeKey:false,
                    closeOnCancel:false,
                    closeOnConfirm: true,
                    type:'info'
                });
                $('#newPatient').trigger('click');
            }
        });
    },
    'change input[name="workingDays"]': function(event, template) {
        var dayId = event.currentTarget.id;
        var hoursRowId = ['#', dayId, '-workingHours'].join('');
        $(hoursRowId).toggleClass('hidden');
        //var hoursRowId2 = ['#', dayId, 'Add-workingHours'].join('');
        //$(hoursRowId2).toggleClass('hidden');
    },
    'click .checkbox label': function(event, template) {
        console.log('click .checkbox label');
        console.log(event.currentTarget);
        console.log($(event.currentTarget).closest('checkbox').find("input"));
        console.log($(event.currentTarget).siblings());
        var input = $(event.currentTarget).siblings()[0];
        if (input!==undefined) {
            var hoursRowId = ['#', input.id, '-workingHours'].join('');
            $(hoursRowId).toggleClass('hidden');
        }
    },
    'click .addDate': function(event, template) {
        //$("span", this).toggleClass("glyphicon-trash glyphicon-plus");
        
        var dayId = event.currentTarget.id;
        $('#'+dayId).find('span').toggleClass('glyphicon-minus glyphicon-plus');
        var hoursRowId = ['#', dayId, '-workingHours'].join('');
        $(hoursRowId).toggleClass('hidden'); 
    }
});

Template.personalInformation.helpers({
    //TODO: throw and error in console
    checkWorkDay: function(day) {
        var isWorkDay = 'Meteor.user().persodata.workTime.' + day + '.isWorkDay';
        if (eval(isWorkDay)) {
            return 'checked';
        }
        return;
    },
    check2Turn: function(day) {
        var from2 = 'Meteor.user().persodata.workTime.' + day + '.from2';
        var to2 = 'Meteor.user().persodata.workTime.' + day + '.to2';
        if (eval(from2) && eval(to2)) {
            return 'show';
        }
        else{
            return 'hidden';
        }
        return;
    },
    check3Turn: function(day) {
        var from3 = 'Meteor.user().persodata.workTime.' + day + '.from3';
        var to3 = 'Meteor.user().persodata.workTime.' + day + '.to3';
        if (eval(from3) && eval(to3)) {
            return 'show';
        }
        else{
            return 'hidden';
        }
        return;
    },
    check2Turnicon: function(day) {
        var from2 = 'Meteor.user().persodata.workTime.' + day + '.from2';
        var to2 = 'Meteor.user().persodata.workTime.' + day + '.to2';
        if (eval(from2) && eval(to2)) {
            return 'glyphicon-minus';
        }
        else{
            return 'glyphicon-plus';
        }
        return;
    },
     check3Turnicon: function(day) {
        var from3 = 'Meteor.user().persodata.workTime.' + day + '.from3';
        var to3 = 'Meteor.user().persodata.workTime.' + day + '.to3';
        if (eval(from3) && eval(to3)) {
            return 'glyphicon-minus';
        }
        else{
            return 'glyphicon-plus';
        }
        return;
    },
    patient: function() {
        if (Template.currentData()) {
            return Template.instance().identity.get() == 1;
        } else {
            return true;
        }
    },
    checkGender: function(value) {
        var sex = Meteor.user().persodata.gender;
        if (sex == value) {
            return 'checked';
        }
        return;
    },
    countrySelected: function(value) {
        var country = Meteor.user().persodata.country;
        if (country == value) {
            return 'selected'
        }
        return;
    }
});
