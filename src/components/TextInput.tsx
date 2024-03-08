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

  function onInvalid(event: FormEvent) {
    // need to assert event.target as HTMLInputElement, I believe, because event.target is typed as a generic
    // HTMLElement which does not have a "validationMessage" property on it, but HTMLInputElement does
    // if you remove the "as HTMLInputElement" type assertion, we see that we do get a Typescript error reading:
    // Property 'validationMessage' does not exist on type 'EventTarget'.
    // is using a type assertion really the only way to correctly type the event?
    const target = event.target as HTMLInputElement;
    console.log("onInvalid firing", target);
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

    /* 
      when we blur the input, we want the browser to re-check validation. If the browser validates successfully as in
      the value of the input is valid, the HTML constraint validation message is read as an empty string
      per MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#complex_constraints_using_the_constraint_validation_api
      an empty string is returned as the target.validationMessage if the input is valid, else it is a non-empty string
    */
    console.log("blur event firing", target);
    console.log("state valid message", validationMessage);
    // get a boolean representation of the message
    const isInputValid = !!validationMessage;

    if (isInputValid) {
      setValidationMessage(target.validationMessage);
    }

    /*
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
