function Input({ type, name, placeholder, value, onChange, title }) {
  return (
    <div className="flex flex-col">
      <div>{title}</div>
      <input
        className="border border-orange-900 p-2 rounded-md"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
