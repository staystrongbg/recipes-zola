import { useRef, useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import Input from '../components/Input';
import { auth, db } from '../firebase-config';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router';

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
    <div className='h-full flex items-center justify-center relative mt-40'>
      <div className='flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl'>
        <h1 className='font-light text-center my-2 text-4xl'>
          Dodaj novo jelo{' '}
        </h1>
        <hr className='w-20 my-8 mx-auto' />

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
            className='w-full h-80 min-h-40 my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none rounded-md'
          ></textarea>
          <label>*Sastojci</label>
          <textarea
            placeholder='npr: sastojak1,sastojak2...'
            className='w-full h-80 min-h-40 my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none rounded-md'
          ></textarea>
          <label>*Kategorija</label>
          <select
            className='p-1 text-lg ml-5 mb-10'
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
            className='bg-yellow-500 text-gray-800 font-medium text-xl inline-flex  w-full items-center px-4 py-4 rounded-xl'
          >
            Dodaj recept
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMealForm;
