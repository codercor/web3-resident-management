const Button = ({
    children,
    onClick,
    className,
    disabled,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
  }) => (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mb-3  disabled:opacity-40 text-2xl font-semibold border border-black rounded py-3 ${className}`}
    >
      {children}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </button>
  );

  export default Button;