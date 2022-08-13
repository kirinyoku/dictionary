import { useState, useEffect, useRef } from 'react';
import { useSearchWordQuery } from "../store/dictionaryApi/dictionary.api";
import { useDebounce } from '../hooks/debounce';

export const HomePage = () => {

  const [ search, setSearch ] = useState(''); 
  const [ visible, setVisible ] = useState(false);
  const debounce = useDebounce(search);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isError, data} = useSearchWordQuery(debounce, {
    skip: debounce.length < 2,
    refetchOnFocus: false,
  });

  useEffect(() => {
    setVisible(debounce.length > 1 && data?.length! > 0)
  }, [debounce, data])

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <div className='flex flex-col justify-center h-full py-24'>
        <h2 className='text-7xl text-slate-700 font-bold block mx-auto mb-6'>Dictionary</h2>
        <input 
          type='text' 
          placeholder='Search for a word'
          className={`text-2xl border-2 outline-none ${search.length === 1 ? 'border-red-500' : 'border-slate-700'} p-2 mx-auto mb-6 rounded w-6/12`}
          value={search}
          ref={inputRef}
          onChange={e => setSearch(e.target.value)}
        />
        { isError ? <p className='block m-auto text-3xl'>Word not found 😔</p> : visible && data && 
        <div className='flex flex-col mx-auto w-6/12'> 
          { 
            <>
              <div className='flex space-x-2 w-fit'>
                <h2 className='text-3xl text-slate-700 font-bold inline-block'>{data[0].word}</h2>
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
                <p className='font-bold text-2xl text-slate-700 mt-2'>DEFINITIONS</p>
                {data[0].meanings.map((m, i) => {
                  return (
                    <div className='flex flex-col text-2xl my-2 py-2 w-fit'>
                      <p>{`${i+1}. Part of speech: [${m.partOfSpeech}]`}</p>
                      <p>{m.definitions[0].definition}</p>
                    </div>
                  )
                })}
              </div>
            </>
          } 
        </div>}  
    </div>    
  )
};
