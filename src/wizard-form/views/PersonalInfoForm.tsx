import { Form } from "../../components/Form";
import { TextInput } from "../../components/TextInput";
import { FormButton } from "../../components/FormButton";
import { useWizardContext } from "../useWizardContext";

interface PersonalInfoFormProps {
  handleSubmit: (data: FormData) => void;
}

export function PersonalInfoForm({ handleSubmit }: PersonalInfoFormProps) {
  const { wizardValues, updateWizardValues } = useWizardContext();
  return (
    <Form
      onSubmit={(formData) => {
        const dataFirstName = formData.get("firstName");
        const a = Object.fromEntries(formData.entries());
        console.log("obj?", a);

        if (typeof dataFirstName === "string") {
          updateWizardValues({
            type: "update",
            payload: { firstName: dataFirstName },
          });
        }

        handleSubmit(formData);
      }}
    >
      <div className="container">
        <TextInput
          label="First Name:"
          name="firstName"
          type="text"
          id="firstName"
          required
          minLength={5}
          errorText="First name must be at least 5 characters"
          defaultValue={wizardValues["firstName"] ? wizardValues.firstName : ""}
        />
        <TextInput
          label="Last Name:"
          name="lastName"
          type="text"
          id="lastName"
          required
          minLength={5}
          errorText="Last name must be at least 5 characters"
        />
        <TextInput
          label="Email:"
          name="email"
          type="email"
          id="email"
          required
          minLength={5}
          errorText="Please make sure your email includes an @ sign, has a character before and after the @ sign, and is at least 5 characters long"
        />
        <FormButton
          className="bg-slate-500 w-full p-2 rounded-sm"
          type="submit"
        >
          Submit
        </FormButton>
      </div>
    </Form>
  );
}
