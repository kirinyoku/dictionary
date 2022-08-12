import { useState, useEffect } from 'react';
import { useSearchWordQuery } from "../store/dictionaryApi/dictionary.api"
import { useDebounce } from '../hooks/debounce'

export const HomePage = () => {

  const [ search, setSearch ] = useState(''); 
  const [ visible, setVisible ] = useState(false);
  const debounce = useDebounce(search);
  const { isLoading, isError, data} = useSearchWordQuery(debounce, {
    skip: debounce.length < 2,
    refetchOnFocus: true,
  });

  useEffect(() => {
    setVisible(debounce.length >= 2 && data?.length! > 0)
  }, [debounce, data])

  return (
    <div className='flex flex-col justify-center h-screen '>
        <input 
          type='text' 
          placeholder='Entry a word'
          className='text-2xl border-2 border-black p-2 mx-auto mb-6 rounded w-2/6'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        { isLoading && <p>Loading...</p> }
        { isError && <p>Error...</p>}
        { visible && data && <div className='flex flex-col mx-auto w-fit'> { 
          <>
            <div className='flex space-x-2 w-fit'>
              <h1 className='text-3xl font-bold inline-block'>{data[0].word}</h1>
              <div className='flex'>
                { data[0].phonetics.map((ph, i) => {
                  if (ph.audio && ph.text) {
                    const audio = new Audio(ph.audio);
                    return (
                      <div key={i} className='flex space-x-2 space-y-1 text-xl items-center p-1'>
                        <p>{`[ ${ph.text} ]`}</p>
                        <button role='button' onClick={() => audio.play()} className='cursor-pointer'>🔊</button>
                      </div>
                    )
                  }
                }) }
              </div>
            </div>
            <div>
              <p className='font-bold text-2xl mt-2'>DEFINITIONS</p>
              {data[0].meanings.map((m, i) => {
                return (
                  <div className='flex flex-col text-xl border-2 border-black my-4 p-2'>
                    <p>{`${i+1}. Part of speech: [${m.partOfSpeech}]`}</p>
                    <p>{m.definitions[0].definition}</p>
                  </div>
                )
              })}
            </div>
          </>
        } </div> }
    </div>    
  )
};
