import { Form } from "../../components/Form";
import { TextInput } from "../../components/TextInput";
import { FormButton } from "../../components/FormButton";

interface AddressInfoFormProps {
  handleSubmit: (data: FormData) => void;
}

export function AddressInfoForm({ handleSubmit }: AddressInfoFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="container">
        <TextInput
          label="Address Line 1:"
          name="address-1"
          type="text"
          id="address-1"
          required
          minLength={5}
        />
        <TextInput
          label="Address Line 2:"
          name="address-2"
          type="text"
          id="address-2"
          required
          minLength={5}
        />
        <FormButton className="bg-slate-500 w-full py-2" type="submit">
          Back
        </FormButton>
        <FormButton className="bg-slate-500 w-full py-2" type="submit">
          Next
        </FormButton>
      </div>
    </Form>
  );
}
