import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useRef, useState } from 'react';
import Kategorija from './Kategorija';
import Button from './Button';
import Autor from './Autor';
import Remove from './Remove';

const MealItem = ({ meal, remove }) => {
  const [user] = useAuthState(auth);
  const [trigger, setTrigger] = useState(null);
  const [boxTop, setBoxTop] = useState(null);

  const box = useRef();

  function isScrolling() {
    setTrigger(window.innerHeight / 1);
    setBoxTop(box.current.getBoundingClientRect().top);
  }

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);

  return (
    <>
      <div
        className={`p-4 bg-yellow-100 mx-4 my-4 relative  max-w-md  text-center shadow-xl transition-all rounded-lg box flex items-end justify-center ${
          boxTop < trigger ? 'show' : ''
        }`}
        style={{
          backgroundImage: `url(${meal.image})`,
          backgroundSize: 'cover',
          height: '600px',
          width: '300px',
          backgroundPosition: 'center',
        }}
        ref={box}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            // background: 'rgba(225, 255, 235, 0.2  )',
            height: '100%',
            width: '100%',
          }}
        ></div>
        {user && user.uid === meal.chef.id && (
          <Remove meal={meal} remove={remove} />
        )}
        <div
          className='w-full h-2/6 m-2 rounded-xl relative shadow-lg flex flex-col justify-between'
          style={{
            backgroundColor: 'rgba(235,235,235,0.93)',
            borderBottomRightRadius: '250px 15px',
            borderBottomLeftRadius: '250px 15px',
            borderTopLeftRadius: '250px 15px',
            borderTopRighttRadius: '250px 15px',
          }}
        >
          <h3 className='text-2xl text-center my-2 text-gray-900 capitalize font-bold'>
            {meal.name.length > 25
              ? meal.name.substring(0, 22) + '...'
              : meal.name}
          </h3>
          <Kategorija meal={meal} />
          <Autor meal={meal} />
          <div className='text-center py-2'>
            <Link to={`/${meal.id}`}>
              <Button />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealItem;
