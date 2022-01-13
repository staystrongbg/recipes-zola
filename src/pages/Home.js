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
  console.log(process.env.REACT_APP_RECEPTI_KEY);
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
    const recipe = doc(db, 'recipes', id);
    await deleteDoc(recipe);
    fetchData();
    prikaziObavestenje(true, 'removed');
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleSelect = (e) => {
    setSearchType(e.target.value);
  };
  return (
    <>
      <div className="bg-[url('../public/healthy-breakfast-ingredients-food-frame-803390.jpg')] bg-cover bg-fixed w-screen overflow-hidden min-h-screen relative">
        <div className='relative flex items-center px-4 justify-evenly  w-full  m-auto mb-10 sm:flex-col '>
          <Obavestenje obavestenje={obavestenje} />
          <SelectCategory handleSelect={handleSelect} />
          {isAuth && (
            <Link to='/new-meal '>
              <button className='bg-orange-500 hover:shadow-lg transition-all px-4 py-2 rounded-lg mx-0 my-4 text-gray-50 uppercase tracking-widest font-medium'>
                Novo Jelo
              </button>
            </Link>
          )}
          <Search handleChange={handleChange} />
        </div>
        <div className='flex flex-wrap justify-center items-center w-11/12 sm:w-full m-auto'>
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
