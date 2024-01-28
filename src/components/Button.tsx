interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.JSX.Element | string;
}

export function Button({ children, ...props }: Props): React.JSX.Element {
  const { className } = props;
  const btnClasses = className ? className : "";

  return (
    <button className={btnClasses} {...props}>
      {children}
    </button>
  );
}
