const Input = ({ input }) => {
  const INPUT_STYLE = `my-2 p-2 block border border-gray-400 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none ${
    input.type === 'number' ? 'w-40' : 'w-full'
  }  h-10 rounded-md bg-transparent text-gray-50`;

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
