const Obavestenje = ({ obavestenje }) => {
  const NOTICE_STYLE = 'text-white fixed bottom-5 right-5 px-4 py-2 rounded-lg';
  return (
    <>
      {obavestenje.show && obavestenje.type === 'removed' ? (
        <p className={`bg-red-400 ${NOTICE_STYLE}`}>Recept je obrisan!</p>
      ) : obavestenje.show && obavestenje.type === 'added' ? (
        <p className={`bg-blue-400 ${NOTICE_STYLE}`}>Recept je dodat!</p>
      ) : obavestenje.show && obavestenje.type ? (
        <p className={`bg-red-700 ${NOTICE_STYLE}`}>{obavestenje.type}</p>
      ) : null}
    </>
  );
};

export default Obavestenje;
