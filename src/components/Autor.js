const Autor = ({ meal }) => {
  return (
    <p className='text-gray-500 text-center my-2 text-base'>
      Autor | <span className='text-gray-600 font-bold'> {meal.chef.name}</span>
    </p>
  );
};

export default Autor;
