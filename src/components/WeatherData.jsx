
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm} from 'react-icons/io'
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'

const WeatherData = ({data}) => {
    let icon;
  //used for displaying different icons according to different weather conditions.
  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]' />
      break;
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]' />
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]' />
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]' />
      break;

    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break;
    default: icon = <IoMdCloudy />

  }

  const date = new Date();
    return (
        <div>
            <div className='flex items-center gap-x-5'>
              <div className='text-[87px]'>{icon}</div>
              <div>
                <div className='text-2xl font-semibold'>
                  {data.name}, {data.sys.country}
                </div>
                <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
              </div>

            </div>
            <div className='my-20'>
              <div className='flex justify-center items-center'>
                <div className='text-[144px] leading-none font-light'>
                  {parseInt(data.main.temp)}
                </div>
                <div className='text-4xl'>
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className='capitalize text-center'>
                {data.weather[0].description}
              </div>
            </div>
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'>
                    <BsEye />
                  </div>
                  <div>
                    Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'>
                    <BsThermometer />
                  </div>
                  <div className='flex'>
                    Feels like
                    <div className='flex ml-2'>{parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'>
                    <BsWater />
                  </div>
                  <div>
                    Humidity <span className='ml-2'>{data.main.humidity} %</span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'>
                    <BsWind />
                  </div>
                  <div>
                    Wind
                    <span className='ml-2'>{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
}

export default WeatherData;