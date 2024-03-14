const Header = ({ saveData }: { saveData: () => void }) => {
  return (
    <main className='px-4 py-5 sm:px-6'>
      <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
        <div className='ml-4 mt-4'>
          <h2 className='text-base font-semibold leading-6 text-white'>
            Demo Editor By Ajay R
          </h2>
        </div>
        <div className='ml-4 mt-4 flex-shrink-0'>
          <button
            onClick={saveData}
            type='button'
            className='rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default Header;
