// referencing code from this article: https://dev.to/cuginoale/form-validationsubmission-in-vanilla-react-no-libraries-51jm

interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: FormData) => void;
}

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
