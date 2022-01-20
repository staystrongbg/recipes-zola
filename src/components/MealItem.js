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
        className={`p-4 bg-yellow-100 mx-4 my-4 relative  max-w-md  text-center  shadow-xl transition-all rounded-lg box flex items-end justify-center ${
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
            background: 'rgba(225, 255, 235, 0.2  )',
            height: '100%',
            width: '100%',
          }}
        ></div>
        {user && user.uid === meal.chef.id && (
          <span
            className='absolute cursor-pointer -top-2 -right-2 rounded-full bg-black'
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
        <div
          className='w-full h-2/6 m-2 rounded-xl relative shadow-lg flex flex-col justify-between'
          style={{
            backgroundColor: 'rgba(235,235,235,0.93)',
            borderBottomRightRadius: '250px 15px',
            borderBottomLeftRadius: '250px 15px',
            borderTopLeftRadius: '250px 15px',
          }}
        >
          <h3 className='text-2xl text-center my-2 text-gray-900 capitalize font-bold'>
            {meal.name.length > 25
              ? meal.name.substring(0, 22) + '...'
              : meal.name}
          </h3>
          {meal.kategorija === 'napitak' ? (
            <span className='absolute -top-2 -right-2 rotate-12 rounded-full bg-green-500 p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30  '
                viewBox='0 0 24 24'
              >
                <path d='M13 24h-7c-2.564-3.483-5-9.782-5-16h17c0 6.167-2.5 12.625-5 16zm6.088-14c-.051.688-.115 1.356-.192 2h1.707c-.321 1.635-1.463 3.331-2.756 4.677-.358 1.283-.772 2.439-1.153 3.229 3.153-1.453 5.987-6.389 6.306-9.906h-3.912zm-8.49-3.001c1.52-.352 2.555-1.276 2.466-2.399-.117-1.485-3.134-2.718-2.32-4.6-4.735 3.817 1.764 3.902-.146 6.999zm-3.207.001c1.523-.29 1.832-1.067 1.832-1.533 0-1.045-2.279-2.002-1.528-3.795-3.648 3.094.995 3.088-.304 5.328z' />
              </svg>
            </span>
          ) : meal.kategorija === 'glavno' ? (
            <span className='absolute -top-2 -right-2 rotate-12 rounded-full bg-green-500 p-2'>
              <svg
                width='30'
                height='30'
                xmlns='http://www.w3.org/2000/svg'
                fill-rule='evenodd'
                clip-rule='evenodd'
              >
                <path d='M18.496 24h-.001c-.715 0-1.5-.569-1.5-1.5v-8.5s-1.172-.003-2.467 0c.802-6.996 3.103-14 4.66-14 .447 0 .804.357.807.851.01 1.395.003 16.612.001 21.649 0 .828-.672 1.5-1.5 1.5zm-11.505-12.449c0-.691-.433-.917-1.377-1.673-.697-.56-1.177-1.433-1.088-2.322.252-2.537.862-7.575.862-7.575h.6v6h1.003l.223-6h.607l.173 6h1.003l.242-6h.562l.199 6h1.003v-6h.549s.674 5.005.951 7.55c.098.902-.409 1.792-1.122 2.356-.949.751-1.381.967-1.381 1.669v10.925c0 .828-.673 1.5-1.505 1.5-.831 0-1.504-.672-1.504-1.5v-10.93z' />
              </svg>
            </span>
          ) : meal.kategorija === 'desert' ? (
            <span className='absolute -top-2 -right-2 rotate-12 rounded-full bg-green-500 p-2'>
              <svg
                width='30'
                height='30'
                xmlns='http://www.w3.org/2000/svg'
                fill-rule='evenodd'
                clip-rule='evenodd'
              >
                <path d='M17.504 19h-1.495l-1 5h-6l-1-5h-1.296l-.563-4h11.859l-.505 4zm1.039-5h-13.035c-.936-.831-1.51-2.078-1.508-3.352.001-.762.231-1.487.523-2.031 2.454 2.359 8.747 2.39 10.486 2.383-3.288-.454-11.179-1.926-9-7 .899-2.094 2.768-3.28 3.996-4-.206 1.539.008 2.713 1.487 3.758 2.854 2.046 8.53 2.48 8.508 6.885-.007 1.422-.717 2.763-1.457 3.357z' />
              </svg>
            </span>
          ) : (
            <span className='absolute -top-2 -right-2 rotate-12 rounded-full bg-green-500 p-2'>
              <svg
                width='30'
                height='30  '
                xmlns='http://www.w3.org/2000/svg'
                fill-rule='evenodd'
                clip-rule='evenodd'
              >
                <path d='M13 24h-2v-5.126c-.806-.208-1.513-.661-2.039-1.274-.602.257-1.265.4-1.961.4-2.76 0-5-2.24-5-5 0-1.422.595-2.707 1.55-3.617-.348-.544-.55-1.19-.55-1.883 0-1.878 1.483-3.413 3.341-3.496.823-2.332 3.047-4.004 5.659-4.004 2.612 0 4.836 1.672 5.659 4.004 1.858.083 3.341 1.618 3.341 3.496 0 .693-.202 1.339-.55 1.883.955.91 1.55 2.195 1.55 3.617 0 2.76-2.24 5-5 5-.696 0-1.359-.143-1.961-.4-.526.613-1.233 1.066-2.039 1.274v5.126z' />
              </svg>
            </span>
          )}
          <p className='text-gray-500 text-center my-2 text-base'>
            {meal.chef.name}
          </p>
          <div className='text-center py-2'>
            <Link to={`/${meal.id}`}>
              <button className='bg-red-500 px-4 py-2 rounded-full text-gray-50 w-4/5 font-medium mt-2 hover:bg-red-700 transition-all'>
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
