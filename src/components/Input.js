const Input = ({ input }) => {
  const INPUT_STYLE =
    'my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none w-full h-10 rounded-md bg-transparent';

  return (
    <>
      <label>{input.label}</label>
      <input
        className={INPUT_STYLE}
        type={input.type}
        placeholder={input.placeholder}
        required={input.required}
        min={input.min && input.min}
        max={input.max && input.max}
      />
    </>
  );
};

export default Input;
