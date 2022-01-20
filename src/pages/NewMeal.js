import { useRef, useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import Input from '../components/Input';
import { auth, db } from '../firebase-config';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router';
import Leaves from '../components/Leaves';

const NewMealForm = () => {
  const { isAuth, prikaziObavestenje } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, []);

  const formRef = useRef();
  const recipesCollections = collection(db, 'recipes');

  const newMealHandler = async (event) => {
    event.preventDefault();
    await addDoc(recipesCollections, {
      name: formRef.current[0].value,
      image:
        formRef.current[1].value ||
        'https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png',
      dish: formRef.current[2].value,
      chef: {
        name: formRef.current[3].value,
        id: auth.currentUser.uid,
      },

      priprema: formRef.current[4].value,
      sastojci: formRef.current[5].value,
      kategorija: formRef.current[6].value,
    });
    navigate('/');
    prikaziObavestenje(true, 'added');
  };

  const [inputs] = useState([
    {
      type: 'text',
      placeholder: 'Ime Jela...',
      label: '*Jelo',
      required: true,
    },
    {
      type: 'text',
      placeholder: 'URL Slike...',
      label: 'URL',
      required: false,
    },
    {
      type: 'number',
      placeholder: 'Broj Porcija...',
      label: '*Porcija',
      required: false,
      min: 0,
      max: 5,
    },
    { type: 'text', placeholder: 'Autor...', label: '*Autor', required: true },
  ]);

  return (
    <div className="bg-[url('../public/pexels-lukas-349610.jpg')] bg-cover bg-fixed absolute top-0 left-0 text-gray-400  w-screen min-h-screen">
      <div className='h-full flex items-center justify-center relative my-40'>
        <div
          className='flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl flex items-start'
          style={{ backgroundColor: 'rgba(235,235,235,0.8)' }}
        >
          <h1 className='font-light text-left my-2 text-4xl text-gray-800 w-full flex justify-between'>
            Dodaj novo jelo <Leaves h={80} w={80} />
          </h1>
          <div className='bg-purple-500 px-4 py-2 w-20 mb-8'></div>

          <form onSubmit={newMealHandler} ref={formRef}>
            {inputs.map((input, idx) => (
              <Input
                key={idx}
                input={input}
                type={input.type}
                min={input.min && input.min.toString()}
                max={input.max && input.max.toString()}
              />
            ))}
            <label>*Priprema</label>
            <textarea
              placeholder='npr: korak1./korak2./...'
              className='w-full h-80 min-h-40 my-2  p-2 border bg-transparent border-gray-400 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none rounded-md'
            ></textarea>
            <label>*Sastojci</label>

            <textarea
              placeholder='npr: sastojak1,sastojak2...'
              className='w-full h-80 min-h-40 my-2 p-2  bg-transparent border border-gray-400 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none rounded-md'
            ></textarea>
            <label>*Kategorija</label>
            <select
              className='p-1 text-lg ml-5 mb-10 bg-slate-200'
              name='kategorija'
              id='kategorija'
              required
            >
              <option value='desert'>Desert</option>
              <option value='glavno'>Glavno jelo</option>
              <option value='napitak'>Napitak</option>
              <option value='dodatak/salata'>Dodaci i salate</option>
            </select>
            <button
              type='submit'
              className='bg-yellow-500 text-gray-500 font-medium text-xl inline-flex  w-full items-center px-4 py-4 rounded-xl'
            >
              Dodaj recept
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMealForm;
