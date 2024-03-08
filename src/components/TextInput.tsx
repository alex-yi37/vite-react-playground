// referencing code from this article: https://dev.to/cuginoale/form-validationsubmission-in-vanilla-react-no-libraries-51jm

import { FormEvent, useState } from "react";

// SO post for typing props to give me all the input element props as optional values
// https://stackoverflow.com/a/62568833
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorText?: string; // so we can customize an error message instead of using one built into the browser
  // apparently built-in browser validation messages are automatically translated, however
  id: string;
  name: string;
}

export function TextInput({
  label,
  type = "text",
  id,
  errorText,
  name,
  ...rest
}: TextInputProps) {
  // from the article, the html input will set a validation message (an "onInvalid" event exists on inputs) when an input
  // fails validation
  const [validationMessage, setValidationMessage] = useState("");

  /*
    User flow scenarios:
    1. user enters all form fields then clicks submit. Expect that every time the user blurs an input, the inputs are validated
       and we can't successfully submit the form until all fields are valid
    2. user clicks submit on empty form. Expect any invalid fields to prevent successful submission
    3. user fills out some fields but not others aka not all inputs get blurred (assuming all are required), then clicks submit. 
       Expect the fields that were filled out to be validated, and on form submission any fields that the user did not enter data
       into also get validated. In this case where all fields are required, any unfilled fields are marked as invalid

    How I think this all works out:
    1. The form component checks validity of inputs only on submission, which will show us any invalid fields when user clicks
       submit button. From Form.tsx, we have this line in the submit handler:
       const isValidForm = formElement.checkValidity();
       this method call to checkValidity checks if all constraints of its children inputs are met, and fires off "invalid" events
       to every input that doesn't pass. It also returns a boolean, true to indicate validation passed and false to indicate
       that not every input was valid.
    2. As a result of the form firing off "invalid" events, this TextInput component receives it and has a registered event
       handler called onInvalid to handle it. Also note the "validationMessage" state defined in this component. It represents 
       the native validation message (HTMLInputElement.validationMessage property) browsers provide for inputs that don't pass
       validation. If the input is invalid, the message is a non-empty string, and if it is valid then it is an empty string.
       There is also an onBlur handler to handle blur events on the input element that is part of this component
    3. When the input receives the "invalid" event, we grab the validationMessage from it using React (using the property
       event.target.validationMessage) and then set our "validationMessage" React state with the value (which should be a
       non-empty string representing the browser validation message). In our rendered output, we check if the 
       "validationMessage" state is a truthy value (non-empty string) and show an error message if so, else we just render null
    4. I'M ACTUALLY STILL CONFUSED ABOUT THE BLUR HANDLER - REVISIT AGAIN:
       Taking note of the onBlur handler defined in this component, it also reads the validationMessage from the input whenever
       the input is blurred. Reading from top to bottom, we grab the event target (the input that was blurred), and determine if
       our "validationMessage" state (set by onInvalid handler) is empty or not in order to tell if the input is valid or not. 
       For convenience and clarity, we turn it into a boolean but I'm pretty sure that isn't actually necessary. And if our state
       is an empty string aka passes validation, then what? I actually think the "validationMessage" state and the validationMessage
       from our input get a little out of sync. The form and inputs are working how I'd like, but not in the way I'd expect
       when looking at the console logged values for our validationMessage state and the event.target.validationMessage value.
       - I think one possible thing happening here is we're seeing old state from a stale closure, but I'd have to think more about
         this scenario
       - also note, I'm calling target.checkValidity() unconditionally where the target is the input that gets blurred. What I
         belive this does is send another "invalid" event to the input and if the input is valid after blur. If valid, no additional
         "invalid" event gets fired. However, if the input doesn't pass validation, an "invalid" event gets fired specifically to
         the indivdual TextInput input and we see its corresponding error message

    NOTE: in scenario 3, we see 3 invalid events get fired which makes sense because the form calls its checkValidity method
      
  */

  function onInvalid(event: FormEvent) {
    // console.log("on invalid firing");
    // need to assert event.target as HTMLInputElement, I believe, because event.target is typed as a generic
    // HTMLElement which does not have a "validationMessage" property on it, but HTMLInputElement does
    // if you remove the "as HTMLInputElement" type assertion, we see that we do get a Typescript error reading:
    // Property 'validationMessage' does not exist on type 'EventTarget'.
    // is using a type assertion really the only way to correctly type the event?
    const target = event.target as HTMLInputElement;
    /*  
      3/7/2024 - when the input doesn't pass the html validation we provide on it, I believe the onInvalid event gets fired
      and in this case we set our validationMessage state to the validation message provided by the browser
      3/8/2024 - actually, the "invalid" event gets fired by the parent form when we call its "checkValidity" message which
      is what we're doing here (check the "Form" component). There is also a "checkValidity" method on input elements, but
      that is not being used in the demo I'm referencing for the code I wrote at the moment. So this onInvalid handler
      is only firing when we submit the form per docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement#instance_methods
      Note the "checkValidity" wording under the linked docs heading. My assumption previously was that the "invalid" event
      handled by this onInvalid handler was getting called when we blurred the input, but that was not the case and the behvavior
      was confusing me. With this knowledge, things make more sense
    */
    setValidationMessage(target.validationMessage);
  }

  function onBlur(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    // console.log("on blur firing");
    /* 
      when we blur the input, we want the browser to re-check validation. If the browser validates successfully as in
      the value of the input is valid, the HTML constraint validation message is read as an empty string
      per MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#complex_constraints_using_the_constraint_validation_api
      an empty string is returned as the target.validationMessage if the input is valid, else it is a non-empty string
    */
    // get a boolean representation of the message
    const isInputValid = !!validationMessage;
    // explore this console log output again later - 3/8/2024
    // console.log(
    //   "isinput valid",
    //   isInputValid,
    //   "and validation message state",
    //   validationMessage,
    //   "event target?",
    //   target.validationMessage
    // );
    if (isInputValid) {
      // target.validationMessage is an empty string if the input passes validation
      setValidationMessage(target.validationMessage);
    }

    /*
      BIG NOTE: I WANT TO UNDERSTAND WHAT'S GOING ON HERE
      seemingly, adding this line seems to achieve the behavior I want: validate the input on blur before the form is
      submitted, and also validate all the fields on form submit. Need to figure out the logic going on here and order of
      events because I don't quite follow it yet
    */
    target.checkValidity();
  }

  // so interestingly, the validationMessage on the event targets on blur and validation handlers seems to
  // have the correct values, but when the setValidationMessage state setter gets called with that value, state doesn't seem
  // to update and no re-render happens?
  // basically, the valiation messages are only displayed when we submit the form. Why is that, even though we are
  // setting the validationMessage state? Is it because the state itself doesn't change?
  // the demo I linked also seems to work this way.

  /* 
    how can I get it so that input validation on the text inputs fires off without first having to submit the form?
    Potential answer: use the HTMLInputElement#checkValidity method to check validation for just a single, specific element
    if the element is invalid, this method returns false and the element also receives the "invalid" event
  */
  return (
    <div className="flex flex-col gap-2 p-2 sm:items-center bg-red-300">
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        className="p-1 w-full sm:w-1/2"
        type={type}
        id={id}
        onInvalid={onInvalid}
        onBlur={onBlur}
        {...rest}
      />
      {/* 
        render input error message. Use the errorText prop if it is passed in as a prop, else fall back to the browser's
        default validation message
      */}
      {validationMessage ? <div>{errorText || validationMessage}</div> : null}
    </div>
  );
}
