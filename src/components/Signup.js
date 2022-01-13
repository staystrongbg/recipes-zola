import { useState } from 'react';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Obavestenje from './Obavestenje';

const Signup = () => {
  const { setIsAuth, prikaziObavestenje, obavestenje } = useGlobalContext();

  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const INPUT_STYLE =
    'my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none w-full h-10 rounded-md bg-transparent';

  const register = async (e) => {
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    )
      .then(() => {
        setIsAuth(true);
        navigate('/');
      })
      .catch((error) => {
        prikaziObavestenje(true, error.code);
      });
  };

  return (
    <div className='text-center my-3 h-screen flex flex-col gap-4 items-center  '>
      <h1 className='text-4xl text-gray-100 shadow-md sm:text-3xl  font-bold my-2 bg-purple-800 px-3 py-1 rounded-lg inline-block'>
        Recepti
      </h1>
      <Obavestenje obavestenje={obavestenje} />
      <h2 className='font-light text-center my-2 text-3xl'>Sign up</h2>
      <form onSubmit={register} className='max-w-sm'>
        <label>Email</label>
        <input
          className={INPUT_STYLE}
          type='email'
          placeholder='enter email'
          onChange={(e) => setRegisterEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          className={INPUT_STYLE}
          onChange={(e) => setRegisterPassword(e.target.value)}
          type='password'
          placeholder='enter password'
          required
        />
        <button
          type='submit'
          className='bg-yellow-500 text-gray-800 font-medium text-xl  w-full items-center px-4 py-2 rounded-xl'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
