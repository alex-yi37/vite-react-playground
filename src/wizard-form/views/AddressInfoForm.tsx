import { Form } from "../../components/Form";
import { TextInput } from "../../components/TextInput";
import { FormButton } from "../../components/FormButton";

export function AddressInfoForm() {
  return (
    <Form>
      <div className="container">
        <TextInput
          label="First Name:"
          type="text"
          id="firstName"
          required
          minLength={5}
        />
        <TextInput
          label="Email:"
          type="email"
          id="email"
          required
          minLength={5}
        />
        <FormButton className="bg-slate-500 w-full py-2" type="submit">
          Submit
        </FormButton>
      </div>
    </Form>
  );
}
