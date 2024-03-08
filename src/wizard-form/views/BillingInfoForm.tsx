import { Form } from "../../components/Form";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";

export function BillingInfoForm() {
  return (
    <Form>
      <div className="container">
        <TextInput label="Name:" type="text" required minLength={5} />
        <TextInput label="Email:" type="email" required minLength={5} />
        <Button className="bg-slate-500 w-full" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
