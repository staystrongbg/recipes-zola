import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase-config';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import NewMeal from './pages/NewMeal';
import Login from './pages/Login';
import Details from './components/Details';
import { AppProvider } from './context';
import About from './pages/About';
import Signup from './pages/Signup';

function App() {
  const [meals, setMeals] = useState([]);
  const [sidebar, setSidebar] = useState(null);

  const fetchData = async () => {
    const recipesCollections = collection(db, 'recipes');
    const data = await getDocs(recipesCollections);
    setMeals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style = sidebar && 'overflow: hidden';
  }, [sidebar]);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <Router>
      <AppProvider>
        <Navbar sidebar={sidebar} setSidebar={setSidebar} />
        <div
          className={` ${
            sidebar ? 'ml-52' : 'ml-0'
          } w-full min-h-screen relative transition-all overflow-x-hidden`}
        >
          <span
            title='Menu Toggle'
            className={`absolute top-3 left-6 z-50 flex items-center gap-1 cursor-pointer text-gray-200 menu-btn-1 ${
              sidebar ? 'active' : ''
            }`}
            onClick={handleSidebar}
          >
            <span></span>
          </span>
          <Routes>
            {meals && (
              <>
                <Route path='/' element={<Home sidebar={sidebar} />} />
                <Route path='/:mealId' element={<Details />} />
              </>
            )}
            <Route path='/new-meal' element={<NewMeal />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/about' element={<About />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
