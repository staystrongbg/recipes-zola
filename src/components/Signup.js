import { useRef, useEffect, useState } from 'react';
import Input from '../components/Input';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Signup = () => {
  const { isAuth, setIsAuth, prikaziObavestenje } = useGlobalContext();
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
    ).then(() => {
      setIsAuth(true);
      navigate('/');
    });
  };

  // const logout = async () => {};

  return (
    <div className='text-center h-screen flex flex-col gap-4 items-center justify-center '>
      {/* // <div className='h-screen flex items-center justify-center relative'> */}
      {/* <div className='flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl'> */}
      <h1 className='font-light text-center my-2 text-4xl'>Register</h1>
      <hr className='w-20 my-8 mx-auto' />

      <form onSubmit={register}>
        <label>Email</label>
        <input
          className={INPUT_STYLE}
          type='email'
          placeholder='enter email'
          onChange={(e) => setRegisterEmail(e.target.value)}
          required
        />{' '}
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
          className='bg-yellow-500 text-gray-800 font-medium text-xl inline-flex  w-full items-center px-4 py-4 rounded-xl'
        >
          Register
        </button>
      </form>
      {/* </div> */}
    </div>
  );
};

export default Signup;
