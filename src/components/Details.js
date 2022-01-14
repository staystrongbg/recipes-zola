import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loading from './Loading';
const Details = () => {
  const { mealId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [meal, setMeal] = useState(null);
  const [sastojci, setSastojci] = useState([]);
  const [priprema, setPriprema] = useState(null);
  useEffect(() => {
    async function getRecipes() {
      const recipesCollections = collection(db, 'recipes');
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

    getRecipes();
  }, []);

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
                  ' linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 50%)',
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
          <div className='flex flex-col m-auto justify-center align-middle w-4/5  '>
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
            </div>
          </div>
        </div>
      )}
      {!meal && <Loading />}
    </>
  );
};
export default Details;
