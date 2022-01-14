import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useRef, useState } from 'react';

const MealItem = ({ meal, remove }) => {
  const [user] = useAuthState(auth);
  const [trigger, setTrigger] = useState(null);
  const [boxTop, setBoxTop] = useState(null);

  const box = useRef();

  function isScrolling() {
    setTrigger(window.innerHeight / 2);
    setBoxTop(box.current.getBoundingClientRect().top);
  }

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);

  return (
    <>
      <div
        className={`p-4 bg-yellow-100 mx-4 my-4 relative  max-w-md  text-center  hover:shadow-xl transition-all rounded-lg box ${
          boxTop < trigger ? 'show' : ''
        }`}
        ref={box}
      >
        {user && user.uid === meal.chef.id && (
          <span
            className='absolute cursor-pointer -top-2 -right-2'
            onClick={() => remove(meal.id)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-red-500'
            >
              <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z' />
            </svg>
          </span>
        )}
        <h3 className='text-3xl text-center my-2 text-gray-700 capitalize font-bold'>
          {meal.name.length > 25
            ? meal.name.substring(0, 22) + '...'
            : meal.name}
        </h3>
        <p className='text-gray-500 text-center my-2 text-base'>
          {meal.chef.name}
        </p>{' '}
        {meal.kategorija && (
          <p className='text-gray-50 bg-green-500 text-center inline-block my-2 text-base py-2 px-4 rounded-md'>
            {meal.kategorija || ''}
          </p>
        )}
        <div className='w-full p-4 flex align-center justify-center flex-col mx-auto my-auto bg-yellow-50 shadow-lg rounded-lg'>
          <img
            src={meal.image}
            className='w-full max-h-80 object-cover'
            alt='Chicken Salad'
          />
          <div className='text-center py-2'>
            <Link to={`/${meal.id}`}>
              <button className='bg-yellow-500 px-4 py-2 rounded-lg text-gray-50 w-4/5 font-medium mt-2'>
                Detalji
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealItem;
