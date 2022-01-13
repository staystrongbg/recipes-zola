import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Navbar = ({ sidebar }) => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useGlobalContext();
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signUserOut = async () => {
    await signOut(auth).then(() => {
      setIsAuth(false);
      navigate('/login');
      localStorage.clear();
    });
  };

  return (
    <nav
      className={` w-52   fixed top-0 bottom-0   flex flex-col items-center justify-start translate-z-0  gap-10 py-4  text-gray-50  z-50 transition-transform bg-custom-800 ${
        sidebar ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <Link to='/'>
        <h1 className='text-4xl shadow-md sm:text-3xl  font-bold my-2 bg-purple-800 px-3 py-1 rounded-lg inline-block'>
          Recepti
        </h1>
      </Link>

      <div
        className={`flex flex-col h-screen  gap-4 px-4 items-center  justify-between `}
      >
        <div className='flex flex-col items-center gap-5'>
          <Link to='/'>Home</Link>
          <Link to='/about' className='leading-4'>
            O meni
          </Link>
        </div>
        {!user ? (
          <div className='flex flex-col gap-2 justify-center items-center'>
            <p className=' text-gray-50 p-1 rounded-md bg-gray-600'>
              Uloguj se,
              <br /> ako zelis da dodas recept
            </p>
            <p className='leading-4 sm:hidden'>Hello, guest!</p>
            <div>
              <Link className='underline px-2 mx-1 py-1' to='/login'>
                Sign in
              </Link>
              <span>or</span>
              <Link to='/register' className='underline mx-1 px-2 py-1'>
                Register
              </Link>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 text-sm'>
            <div>
              <ul className='px-4 py-2 cursor-pointer text-center'>
                <li>
                  Signed in as <br /> <b>{user.email}</b>
                </li>
                <li onClick={signUserOut}>Sign out</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
