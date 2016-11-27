Template.telemedicine.events({

 var survey = new Survey.Survey({ title: "Tell us, what technologies do you use?", pages: [
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

new Survey.SurveyTemplateText().replaceText('<div class="btn-group"><!-- ko foreach: { data: question.visibleChoices, as: "item", afterRender: question.koAfterRender}  --> <label class="btn btn-default" data-bind="css:{active: $data.value == question.koValue()}, style:{width: question.koWidth}">   <input type="radio" style="display:none;" data-bind="attr: {name: question.name, value: item.value}, checked: question.koValue" /> <span data-bind="text: item.text"></span></label><!-- /ko --><div data-bind="visible:question.hasOther"><div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible } }"></div></div></div>', "question", "radiogroup");
new Survey.SurveyTemplateText().replaceText('<div class="btn-group"><!-- ko foreach: { data: question.visibleChoices, as: "item", afterRender: question.koAfterRender}  --> <label class="btn btn-default" data-bind="css:{active: question.koValue().indexOf($data.value) > -1}, style:{width: question.koWidth}">   <input style="display:none;" type="checkbox" data-bind="attr: {name: question.name, value: item.value}, checked: question.koValue" /> <span data-bind="text: item.text"></span></label><!-- /ko --><div data-bind="visible:question.hasOther"><div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible } }"></div></div></div>', "question", "checkbox");
