const Input = ({
  placeholder,
  value,
  name,
  onChange,
  type,
  min,
  max,
}: {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
  type: string;
  min?: number;
  max?: number;
}) => (
  <input
    placeholder={placeholder}
    type={type}
    min={min}
    max={max}
    value={value}
    name={name}
    onChange={onChange}
    className="border-2 border-black rounded-md px-2 py-1 w-full"
  />
);

export default Input;
