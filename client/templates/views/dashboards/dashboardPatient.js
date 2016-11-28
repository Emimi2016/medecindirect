Template.dashboardPatient.onCreated(function() {
    var self = this;
    self.subscribe('usermessages');
    self.subscribe('bills');
    self.subscribe('appointments');
    self.subscribe('doctor');
    self.subscribe('medicalRecords');

});

Template.dashboardPatient.onRendered(function() {
    Meteor.setTimeout(function() {
        $('#appointments').dataTable({"dom": '<"top">t<"bottom"><"clear">'});
        $('#prescriptions').dataTable({
            "dom": '<"top">t<"bottom"><"clear">',
            'pageLength': 5
        });

       Template.medicalRecord.onRendered(function() {
     Meteor.setTimeout(function() { 
        if (MedicalRecords.findOne().vitals.length < 12) {
            var chartData = MedicalRecords.findOne().vitals;
        } else {
            var chartData = MedicalRecords.findOne().vitals.slice(-12);
        }
        var labels = [],
            weightData = [],
            heightData = [],
            bmiData = [],
            bpData = [],
            pulseData = [],
            respData = [],
            tempData = [];
        for (var i = 0; i < chartData.length; i++) {
            var vital = chartData[i];
            console.log(vital);
            labels.push(moment(vital.date).format('MMM Do'));
            weightData.push(vital.weight);
            heightData.push(vital.height);
            bmiData.push(vital.bmi);
            bpData.push(vital.bp);
            pulseData.push(vital.pulse);
            respData.push(vital.respiration);
            tempData.push(vital.temperature);
            console.log(labels);
        }
        var vitalData = {
            labels: labels,
            datasets: [
                {
                    label: "Weight",
                    fillColor: "rgba(210, 105, 30, 0.2)",
                    strokeColor: "rgba(210, 105, 30, 1)",
                    pointColor: "rgba(210, 105, 30, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(210, 105, 30, 1)",
                    data: weightData
                },
                {
                    label: "Height",
                    fillColor: "rgba(255, 208, 0, 0.2)",
                    strokeColor: "rgba(255, 208, 0, 1)",
                    pointColor: "rgba(255, 208, 0, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(255, 208, 0, 1)",
                    data: heightData
                },
                {
                    label: "BMI",
                    fillColor: "rgba(205, 17, 17, 0.7)",
                    strokeColor: "rgba(205, 17, 17, 1)",
                    pointColor: "rgba(205, 17, 17, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(205, 17, 17, 1)",
                    data: bmiData
                },
                {
                    label: "BP",
                    fillColor: "rgba(240, 128, 231, 0.2)",
                    strokeColor: "rgba(240, 128, 231, 1)",
                    pointColor: "rgba(240, 128, 231, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(240, 128, 231, 1)",
                    data: bpData
                },
                {
                    label: "Pulse",
                    fillColor: "rgba(136, 128, 240, 0.2)",
                    strokeColor: "rgba(136, 128, 240, 1)",
                    pointColor: "rgba(136, 128, 240, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(136, 128, 240, 1)",
                    data: pulseData
                },
                {
                    label: "Respiration",
                    fillColor: "rgba(95, 198, 221, 0.3)",
                    strokeColor: "rgba(95, 198, 221, 1)",
                    pointColor: "rgba(95, 198, 221, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(95, 198, 221, 1)",
                    data: respData
                },
                {
                    label: "Temperature",
                    fillColor: "rgba(136, 108, 21, 0.3)",
                    strokeColor: "rgba(136, 108, 21, 1)",
                    pointColor: "rgba(136, 108, 21, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(136, 108, 21, 1)",
                    data: tempData
                }
            ]
        };
        var vitalOptions = {
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 1,
            datasetFill: true,
            responsive: true
        };

var ctx = document.getElementById("vitalOptions").getContext("2d");
        var billsChart = new Chart(ctx).Line(vitalData, vitalOptions);
    }, 300); 
});

Template.medicalRecord.helpers({
    'medicalRecord': function() {
        return MedicalRecords.findOne({});
    }
});


Template.medicalRecord.onRendered(function() {
     Meteor.setTimeout(function() { 
        if (MedicalRecords.findOne().bill.length < 12) {
            var chartData = MedicalRecords.findOne().bill;
        } else {
            var chartData = MedicalRecords.findOne().bill.slice(-12);
        }
        var labels = [],
            amountData = [];
        for (var i = 0; i < chartData.length; i++) {
            var bill = chartData[i];
            console.log(bill);
            labels.push(moment(bill.date).format('MMM Do'));
            billData.push(bill.amount);
            console.log(labels);
        }
        var billData = {
            labels: labels,
            datasets: [
                {
                    label: "amount",
                    fillColor: "rgba(136, 108, 21, 0.3)",
                    strokeColor: "rgba(136, 108, 21, 1)",
                    pointColor: "rgba(136, 108, 21, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(136, 108, 21, 1)",
                    data: amountData
                }
            ]
        };
        var billOptions = {
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 1,
            datasetFill: true,
     
            responsive: true
        };

var ctx = document.getElementById("billOptions").getContext("2d");
        var billChart = new Chart(ctx).Line(billData, billOptions);
    }, 300); 
});

Template.medicalRecord.helpers({
    'medicalRecord': function() {
        return MedicalRecords.findOne({});
    }
});


Template.dashboardPatient.helpers({
    messages: function() {
        return UserMessages.find();
    },
    formatedMessageDate: function() {
        return moment(this.date).format('LLLL');
    },
    formatedStartDate: function() {
        return moment(this.startDate).format('MMM Do YYYY');
    },
    formatedAppointmentTime: function() {
        return moment(this.startDate).format('h:mm A') + ' - ' + moment(this.endDate).format('h:mm A');
    },
    formatedAppointmentDay: function() {
        return moment(this.startDate).format('D');
    },
    formatedAppointmentDayName: function() {
        return moment(this.startDate).format('dddd');
    },
    medicalRecord: function() {
        return MedicalRecords.findOne();
    },
    nextAppointment: function() {
        return Appointments.findOne({
            startDate: {$gte: new Date()}
        }, {sort:{startDate: 1}, limit: 1});
    },
    unreadMail: function() {
        return UserMessages.findOne({
            $and: [
                {userId: Meteor.userId()},
                {isRead: false},
                {isSent: false}
            ]
        }, {limit: 1});
    },
    unreadCount: function() {
        var count = UserMessages.find({$and: [{isRead: false}, {isSent: false}]}).count();
        return count ? count : "";
    },
    doctor: function(){
        return Meteor.users.findOne({_id: Meteor.user().doctor.doctorId});
    },
    chartObj: function(){
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Bills',
                x: -20 //center
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
            },
            series: [{
                name: 'Bills',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }]
        };
    }
});
