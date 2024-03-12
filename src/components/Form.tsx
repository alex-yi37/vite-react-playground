// referencing code from this article: https://dev.to/cuginoale/form-validationsubmission-in-vanilla-react-no-libraries-51jm

interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: FormData) => void;
}

// the onSubmit handler for this Form element grabs form data from the form itself and turns it into a FormData object
// the handleSubmit PROP is a function that takes the FormData we get from the form when it is
// submitted and does some api call, etc
// in this example specifically, it should POST the data to some back end (or a mocked on) and send an event to
// the VanillaWizard state machine to let us transition to the next state

export function Form({ children, onSubmit }: FormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;

    // this is how we can determine if the form fields pass html validation
    const isValidForm = formElement.checkValidity();

    if (isValidForm) {
      const formData = new FormData(formElement);
      onSubmit(formData);
    }
  }

  return (
    <form
      className="flex flex-col items-center"
      noValidate
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}
