Template.personalInformation.onRendered(function(){

App.Questions = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},

    getMeteorData() {
        var data = {},
            alert = $('.form.alert.module'),
            handle = Meteor.subscribe('questions');

        if (handle.ready()) {
            data.questions = Questions.find({}, {sort: {order: 1}}).fetch();
            alert.hide();
        }

        return data;
    },

    calculateChoices: function (event) {
        event.preventDefault();

        // TODO: refactor validation into form alerts module
        var score = 0,
            valid = false,
            question = $('.radio.input.group'),
            alert = $('.form.alert.module');

        $(question).each(function () {
            var checked = $(this).find('.radio.input:checked');
            if (checked.length === 0) {
                valid = false;
                return valid;
            } else {
                valid = true;
                score += Number(checked.val());
            }
            return valid;
        });

        if (valid) {
            alert.hide();
            Meteor.call('insertReport', score, (error) => {
                if (error) {
                    console.error('Insert report method failed: ' + error);
                } else {
                    FlowRouter.go('Diagnosis');
                }
            });
        } else {
            alert.show();
        }
    },

    renderQuestions() {
        return this.data.questions.map(function (question) {
            return (
                <section className="question" key={question._id}>
                    <h2 className="title">{question.order}. {question.question}</h2>

                    <div className="radio input group">
                        <App.FormInput type="radio" label={question.choices[0].choice} name={question.name}
                                       value={question.choices[0].value}/>
                        <App.FormInput type="radio" label={question.choices[1].choice} name={question.name}
                                       value={question.choices[1].value}/>
                        <App.FormInput type="radio" label={question.choices[2].choice} name={question.name}
                                       value={question.choices[2].value}/>
                        <App.FormInput type="radio" label={question.choices[3].choice} name={question.name}
                                       value={question.choices[3].value}/>
                    </div>
                </section>
            )
        });
    },

    render: function () {
        return (
            <form className="questions form module" onSubmit={this.calculateChoices}>
                <App.FormAlerts alert="animated bounceInDown form alert module" type="negative message" message="Please answer all the questions" />
                {(this.data.questions) ? this.renderQuestions() : <App.Loading />}
                <button type="submit" className="fluid primary button">Feel Better</button>
            </form>
        )
    }
});
});
