interface Props {
  children: React.JSX.Element | Array<React.JSX.Element>;
  title: string;
}

export function FormContainer({ children, title }: Props) {
  return (
    <div className="flex flex-col align-middle container p-4">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
