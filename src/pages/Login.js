import { useGlobalContext } from '../context';
import { useState, useRef } from 'react';
import Input from '../components/Input';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { auth } from '../firebase-config';

const Login = () => {
  const navigate = useNavigate();
  if (auth.email) {
    navigate('/');
  }

  const INPUT_STYLE =
    'my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none w-full h-10 rounded-md bg-transparent';
  const { signInWithGoogle, signInWithGithub, setIsAuth } = useGlobalContext();
  const [loggedEmail, setLoggedEmail] = useState('');
  const [loggedPass, setLoggedPass] = useState('');

  const userLogin = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loggedEmail, loggedPass).then(() => {
      setIsAuth(true);
      localStorage.setItem('isAuth', true);

      navigate('/');
    });
  };
  return (
    <>
      <div className='text-center h-screen flex flex-col gap-4 items-center justify-center '>
        <h1 className='font-light text-center my-2 text-4xl'>Sign in</h1>
        <hr className='w-20 my-8 mx-auto' />
        <form onSubmit={userLogin}>
          <label>Email</label>
          <input
            className={INPUT_STYLE}
            type='email'
            placeholder='enter email'
            onChange={(e) => setLoggedEmail(e.target.value)}
            required
          />{' '}
          <label>Password</label>
          <input
            className={INPUT_STYLE}
            onChange={(e) => setLoggedPass(e.target.value)}
            type='password'
            placeholder='enter password'
            required
          />
          <button
            type='submit'
            className='bg-yellow-500 text-gray-800 font-medium text-xl inline-flex  w-full items-center px-4 py-4 rounded-xl'
          >
            Sign in
          </button>
        </form>
        <p>Other login methods</p>
        <span
          onClick={signInWithGoogle}
          className='text-black  max-w-fit py-2 px-4 flex items-center justify-center gap-2'
        >
          Google
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path
              d='M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z'
              fill-rule='evenodd'
              clip-rule='evenodd'
            />
          </svg>
        </span>{' '}
        <span
          onClick={signInWithGithub}
          className=' flex items-center justify-center  max-w-fit py-2 px-4 gap-2'
        >
          Github
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
          </svg>
        </span>
      </div>
    </>
  );
};

export default Login;
