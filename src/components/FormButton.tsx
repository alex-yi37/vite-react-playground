import { Button, ButtonProps } from "./Button";

interface FormButtonProps extends ButtonProps {}

export function FormButton({ children, ...rest }: FormButtonProps) {
  return (
    <Button className="" {...rest}>
      {children}
    </Button>
  );
}
