import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  const [city, setCity] = useState('');
  const [wDetails, setWdetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getData = (event) => {
    setIsLoading(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7034a1f4bde7e3b269bc815e6ab4814&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes);
        }
        setIsLoading(false);
      });

    event.preventDefault();
    setCity('');
  };

  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto '>
        <h1 className="text-[40px] font-bold py-[50px] text-white">Weather App</h1>
        <form onSubmit={getData}>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='w-[300px] h-[40px] pl-3'
            placeholder='City Name'
          />
          <button className='bg-[blue] w-[70px] h-[40px]'>Submit</button>
        </form>
        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif' width={100} className={`absolute left-[40%] ${isLoading ? '' : 'hidden'}`} />

          {wDetails !== undefined ? (
            <>
              <h3 className='font-bold text-[30px]'>{wDetails.name} <span className='bg-[yellow]'>{wDetails.sys.country}</span></h3>
              <h2 className='font-bold text-[40px]'>
                {wDetails.main.temp}
              </h2>
              <img src={`https://openweathermap.org/img/wn/${wDetails.weather[0].icon}.png`} alt='Weather Icon' />
              <p>{wDetails.weather[0].description}</p>
            </>
          ) : (
            "no Data"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
