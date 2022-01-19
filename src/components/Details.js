import { collection, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../firebase-config';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import Loading from './Loading';
import { doc } from 'firebase/firestore';
import { useGlobalContext } from '../context';
import { auth } from '../firebase-config';
import MealItem from '../components/MealItem';
import Obavestenje from './Obavestenje';

const Details = ({ fetchData }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { prikaziObavestenje, obavestenje } = useGlobalContext();
  const { mealId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [meal, setMeal] = useState(null);
  const [sastojci, setSastojci] = useState([]);
  const [priprema, setPriprema] = useState(null);
  const [editMeal, setEditMeal] = useState('');

  const editFormRef = useRef(null);
  const dummy = useRef(null);
  const recipesCollections = collection(db, 'recipes');

  async function getRecipes() {
    const data = await getDocs(recipesCollections);
    const mealList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //   const regex = /[1-9]./g;
    setRecipes(mealList);
    setMeal(mealList.find((recipe) => recipe.id === mealId));
    setSastojci(
      mealList.find((recipe) => recipe.id === mealId).sastojci.split(/[,:]+/)
    );
    setPriprema(
      mealList.find((recipe) => recipe.id === mealId).priprema.split(/[/]+/)
    );
  }

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    if (editMeal && dummy.current) {
      dummy.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [editMeal]);

  //edit recipe
  const editRecipe = () => {
    const recipe = doc(db, 'recipes', mealId);
    setEditMeal(recipe);
  };

  const postNewRecipe = async (e) => {
    e.preventDefault();
    const recipe = doc(db, 'recipes', mealId);

    console.log(sastojci, priprema);

    const updPriprema = editFormRef.current[0].value;
    const updSastojci = editFormRef.current[1].value;

    console.log(updSastojci, updPriprema);

    await updateDoc(recipe, {
      priprema: updPriprema,
      sastojci: updSastojci,
    })
      .then(() => setEditMeal(''))
      .then(() => getRecipes())
      .then(() => prikaziObavestenje(true, 'Recept je izmenjen!'));
  };
  //edit ne moze da vidi svako!
  const RECEPT_H = 'text-4xl font-bold text-gray-600 mb-10 ';
  const RECEPT_PRIPREMA = 'w-full';
  const RECEPT_SASTOJCI = 'w-1/4 sm:w-full';
  const H_CONTAINER = 'h-full flex items-center justify-center p-3';
  const HEADING =
    'text-2xl sm:text-xl text-center sm:leading-4    text-gray-50';
  const OPIS = 'text-left text-gray-50 text-sm uppercase drop-shadow-sm ';
  const OPIS_CONTAINER = 'sm:h-18 ';

  return (
    <>
      {meal && (
        <div className='flex flex-col h-screen w-full '>
          <div className='relative h-screen w-full '>
            <div
              style={{
                position: 'absolute',
                background:
                  ' linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.5) 50%)',
                height: '100%',
                width: '100%',
              }}
            ></div>
            <img
              className='object-cover h-screen w-full'
              src={meal.image}
              alt=''
            />
            <div className='absolute bottom-3 left-2'>
              <h1 className=' text-9xl text-gray-50 sm:text-5xl font-bold drop-shadow-lg capitalize text-lwdt my-10 tiny:ml-3'>
                {meal.name}
              </h1>
              <div className='flex items-center ml-2 sm:ml-0 justify-start tiny:ml-3'>
                <div className={OPIS_CONTAINER}>
                  <p className={OPIS}>Autor</p>
                  <div className={`bg-red-700 ${H_CONTAINER}`}>
                    <h3 className={HEADING}>{meal.chef.name} </h3>
                  </div>
                </div>
                <div className={OPIS_CONTAINER}>
                  <p className={OPIS}>Kategorija</p>
                  <div className={`bg-green-700 ${H_CONTAINER}`}>
                    <h3 className={HEADING}>{meal.kategorija}</h3>
                  </div>
                </div>
                <div className={OPIS_CONTAINER}>
                  <p className={OPIS}>Br. porcija</p>
                  <div className={`bg-gray-800 ${H_CONTAINER}`}>
                    <h3 className={HEADING}>{meal.dish}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!editMeal && (
            <div className='flex flex-col m-auto justify-center align-middle w-4/5  '>
              <Obavestenje obavestenje={obavestenje} />
              <div className='my-20 p-10 flex gap-20 sm:flex-col sm:p-2'>
                <div className={RECEPT_SASTOJCI}>
                  <h2 className={RECEPT_H}>Sastojci:</h2>
                  {sastojci &&
                    sastojci.map((sastojak, idx) => (
                      <p key={idx} className='mb-2 text-lg '>
                        - {sastojak}
                      </p>
                    ))}
                </div>
                <div className={RECEPT_PRIPREMA}>
                  <h2 className={RECEPT_H}>Priprema:</h2>

                  {priprema &&
                    priprema.map((p, idx) => (
                      <p key={idx} className='mb-8 text-lg '>
                        <b className='text-2xl py-1 px-2 bg-red-300 text-gray-50'>
                          {idx + 1}.
                        </b>{' '}
                        {p}
                      </p>
                    ))}
                </div>
                {user && user.uid === meal.chef.id && (
                  <span onClick={editRecipe} title='Edit recipe'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                    >
                      <path d='M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z' />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {editMeal && (
        <div
          className='text-center my-3 h-screen flex flex-col gap-4 items-center'
          ref={dummy}
        >
          <form
            className='max-w-full'
            ref={editFormRef}
            onSubmit={postNewRecipe}
          >
            <label>*Priprema</label>
            <textarea
              defaultValue={meal.priprema}
              // onChange={(e) => setPriprema(e.target.value)}
              placeholder='npr: korak1./korak2./...'
              className='w-full h-80 min-h-40 my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none rounded-md'
            ></textarea>
            <label>*Sastojci</label>
            <textarea
              defaultValue={meal.sastojci}
              // onChange={(e) => setSastojci(e.target.value)}
              placeholder='npr: sastojak1,sastojak2...'
              className='w-full h-80 min-h-40 my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none rounded-md'
            ></textarea>
            <button className='bg-yellow-500 text-gray-800 font-medium text-xl inline-flex  w-full items-center px-4 py-4 rounded-xl'>
              Dodaj recept
            </button>
          </form>
        </div>
      )}

      {!meal && <Loading />}
    </>
  );
};
export default Details;
