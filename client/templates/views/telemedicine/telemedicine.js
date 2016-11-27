Template.telemedicine.events({

        if (!this.question)
            return null;
        return React.createElement("form", {className: "btn-group", ref: "toggleInput"}, this.getItems());
    componentDidMount() {
        this.refs.toggleInput.setAttribute('data-toggle', 'buttons');
    };    
    renderRadio(key, item, isChecked, divStyle, otherItem) {
        var className = "btn btn-default";
        if(isChecked) className += " active";
        return (React.createElement("label", {key: key, style: divStyle, className: className}, 
            React.createElement("input", {type: "radio", checked: isChecked, value: item.value, onChange: this.handleOnChange}), 
            React.createElement("span", {}, item.text), 
            otherItem));
    };
}

class telemedicineCheckboxItem extends Survey.SurveyQuestionCheckboxItem {
    renderCheckbox(isChecked, divStyle, otherItem) {
        var className = "btn btn-default";
        if(isChecked) className += " active";
        return (React.createElement("label", {className: className, style: divStyle}, 
            React.createElement("input", {type: "checkbox", checked: isChecked, onChange: this.handleOnChange}), 
            React.createElement("span", {}, this.item.text), 
            otherItem));
    };
}

class MySurveyQuestionCheckbox extends Survey.SurveyQuestionCheckbox {
    render() {
        if (!this.question)
            return null;
        return React.createElement("div", {className: "btn-group", ref: "toggleInput"}, this.getItems());
    }
    componentDidMount() {
        this.refs.toggleInput.setAttribute('data-toggle', 'buttons');
    };    
    renderItem(key, item) {
        return React.createElement(MySurveyQuestionCheckboxItem, {key: key, question: this.question, item: item, css: this.css, rootCss: this.rootCss });
    };
} 
 
Survey.ReactQuestionFactory.Instance.registerQuestion("checkbox", (props) => {
    return React.createElement(MySurveyQuestionCheckbox, props);
});

Survey.ReactQuestionFactory.Instance.registerQuestion("radiogroup", (props) => {
    return React.createElement(MySurveyQuestionRadiogroup, props);
});

var survey = new Survey.ReactSurveyModel({ title: "Tell us, what technologies do you use?", pages: [
  { name:"page1", questions: [ 
      { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "frameworkUsing",title: "Do you use any front-end framework like Bootstrap?" },
      { type: "checkbox", choices: ["Bootstrap","Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visible: false }
   ]},
  { name: "page2", questions: [
    { type: "radiogroup", choices: ["Yes","No"],isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
    { type: "checkbox", choices: [ "AngularJS", "KnockoutJS", "React" ], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visible: false } ] },
  { name: "page3",questions: [
    { type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" } ] }
 ],
 triggers: [
  { type: "visible", operator: "equal", value: "Yes", name: "frameworkUsing", questions: ["framework"]},
  { type: "visible", operator: "equal", value: "Yes", name: "mvvmUsing", questions: ["mvvm"]}
 ]
});
ReactDOM.render(<Survey.Survey model={survey} />, document.getElementById("surveyElement"));
