import React, { useEffect, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im'
import axios from 'axios';
import Search from './components/Search';
import WeatherData from './components/WeatherData';

const APIkey = '72a64bb17e8bfe9f9d6ebe88572dc69f';

const WeatherApp = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Delhi');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cities, setCities] = useState(null);

  //main autoComplete function used to fetch the different locations based on some prefix.
  function autoComplete(val) {
    var requestOptions = {
      method: 'GET',
    };
    if (val) {
      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${val}&apiKey=9723c00490fa4eb88f4d090e09773bc4`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const arr = [];
          result.features.map((el, index) => {
            if (result.features[index].properties.city !== undefined) arr.push(result.features[index].properties.city)
          })
          setCities(arr);
        })
        .catch(error => console.log('error', error));
    }

  }

  //resets the values, when some option of location is clicked.
  function handleClick(ev) {

    setInputValue(ev.target.value);
    setCities(null);
  }

  const handleInput = (e) => {
    setInputValue(e.target.value);
    autoComplete(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCities(null);
    if (inputValue !== '') {
      setLocation(inputValue);
    }
    if (inputValue === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500)
    }
    setInputValue('');
  }

  //fetch the data
  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 1500);
    }).catch((err) => {
      setLoading(false);
      setErrorMsg(err);
    })
  }, [location]);
  
  //shows the error msg for 2s, then the msg disappears.
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  //if data is false show the loader.
  if (!data) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    )
  }

  
  return (

    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover 
    bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      
      {/*Search field for searching based on city name.*/}
      <Search animate={animate} inputValue={inputValue} handleInput={handleInput} handleSubmit={handleSubmit}/>

      {/*Displaying of error msg in case of no available city of the given search input.*/}
      {errorMsg && 
      <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white  p-2 capitalize rounded-md'>
        {`${errorMsg.response.data.message}`}
      </div>
      }

      {/*displaying the autocomplete locations based on some prefix */}
      {cities && inputValue && cities.map((el, index) => {
        if (index >= 2) return '';
        return <option className='text-white bg-[#3c2172]/50 min-w-[300px] rounded-full mb-1' onClick={handleClick} value={el}>{el}</option>
      })}

      {/*Main display part*/}
      <div className='w-full max-w-[450px] bg-black/20 min-h-[550px] text-white backdrop-blur-[32px] 
      rounded-[32px] py-6 px-6'>
        {loading ?
          //loading
          <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner8 className='text-white text-5xl animate-spin' />
          </div>
          :
          //loaded data
          <WeatherData data={data}/>
        }

      </div>
    </div>
  )
};

export default WeatherApp;
