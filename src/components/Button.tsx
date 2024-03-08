export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const defaultClasses = "bg-sky-400 px-4 py-2 rounded";

export function Button({ children, ...props }: ButtonProps): React.JSX.Element {
  const { className } = props;
  const btnClasses = className ? className : "";

  return (
    <button className={`${btnClasses} ${defaultClasses}`} {...props}>
      {children}
    </button>
  );
}
