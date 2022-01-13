import { auth, provider } from './firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [obavestenje, setObavestenje] = useState({ show: false, type: '' });

  useEffect(() => {
    setIsAuth(window.localStorage.getItem('isAuth'));
  }, []);

  //sign in methods
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };

  const signInWithGithub = () => {
    signInWithPopup(auth, provider).then((result) => {
      // localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };
  //sign in methods

  //register new user

  function prikaziObavestenje(bolean, msg) {
    setObavestenje({ show: bolean, type: msg });
    setTimeout(() => {
      setObavestenje({ show: false, type: '' });
    }, 3000);
  }

  return (
    <AppContext.Provider
      value={{
        signInWithGoogle,
        signInWithGithub,
        isAuth,
        prikaziObavestenje,
        obavestenje,
        setIsAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
