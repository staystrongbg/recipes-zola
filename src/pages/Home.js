import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import { getDocs, collection } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import MealItem from '../components/MealItem';
import Loading from '../components/Loading';
import Obavestenje from '../components/Obavestenje';
import { Search } from '../components/Search';
import { SelectCategory } from '../components/Search';

const Home = () => {
  const { isAuth, prikaziObavestenje, obavestenje } = useGlobalContext();
  const [meals, setMeals] = useState([]);
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');

  const fetchData = async () => {
    const recipesCollections = collection(db, 'recipes');
    const data = await getDocs(recipesCollections);
    setMeals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setResult(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setResult(
      meals.filter((meal) => meal.name.toLowerCase().includes(searchTerm))
    );
  }, [searchTerm]);

  useEffect(() => {
    setResult(
      meals.filter((meal) => meal.kategorija.toLowerCase().includes(searchType))
    );
  }, [searchType]);

  const remove = async (id) => {
    if (window.confirm('Da li zaista hoces da obrises recept?') == true) {
      const recipe = doc(db, 'recipes', id);
      await deleteDoc(recipe);
      fetchData();
      prikaziObavestenje(true, 'removed');
    } else {
      return;
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSelect = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      <div className="bg-[url('../public/pexels-lukas-349610.jpg')] bg-cover bg-fixed  top-0 left-0 text-gray-400  w-screen min-h-screen relative">
        <div
          style={{
            position: 'absolute',
            background:
              'linear-gradient( to bottom,rgba(235,235,235,0.1), rgba(235,235,235,0.8))',
            height: '100%',
            width: '100%',
          }}
        ></div>
        <div className='relative flex items-center px-4 justify-evenly  w-full  m-auto mb-10 sm:flex-col '>
          <Obavestenje obavestenje={obavestenje} />
          <SelectCategory handleSelect={handleSelect} />
          {isAuth && (
            <Link to='/new-meal '>
              <button className='bg-orange-500 hover:bg-orange-700 transition-all px-4 py-2 rounded-lg mx-0 my-4 text-gray-50 uppercase tracking-widest font-medium'>
                Novo Jelo
              </button>
            </Link>
          )}
          <Search handleChange={handleChange} />
        </div>
        <div className='flex flex-wrap justify-center items-center w-11/12 sm:w-full m-auto gap-16'>
          {result.length > 0 ? (
            result.map((meal) => (
              <MealItem meal={meal} remove={remove} key={meal.id} />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
