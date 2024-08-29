import dotenv from 'dotenv';
import dayjs, {type Dayjs} from 'dayjs';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

class Weather {
constructor(
public city: string,
public date: Dayjs | string,
public tempF: number,
public windSpeed: number,
public humidity: number,
public icon: string,
public iconDescription: string,
) {}

}
// TODO: Define a class for the Weather object
class WeatherService {
  private baseURL?: string;
  private apiKey?: string;
  private city = ""

constructor() {
  this. baseURL = process. env.API_BASE_URL ||"";
  this. apiKey = process.env.API_KEY ||"";
}

private async fetchLocationData(query: string) {
    try {
      if (!this.baseURL || !this.apiKey) {
        throw new Error("Invalid API configuration");
      }

  const response: Coordinates[] = await fetch(query).then(res => res.json());
    return response [0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
 private destructureLocationData(locationData: Coordinates): Coordinates {
  if (!locationData) {
    throw new Error("Invalid location data");
  }
  const { name, lat, lon, country, state } = locationData;

  const coordinates: Coordinates = {
    name,
    lat,
    lon,
    country,
    state,
  };
  return coordinates;
}

    private buildGeocodeQuery(): string {
      const geocodeQuery = `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
      return geocodeQuery;
    }
    private buildWeatherQuery(coordinates: Coordinates): string {
      const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
      return weatherQuery;
    }
    private async fetchAndDestructureLocationData() {
      return await this.fetchLocationData(this.buildGeocodeQuery()).then((locationData) => this.destructureLocationData(locationData));
    }
    private async fetchWeatherData(coordinates: Coordinates) {
      try {
        const response = await fetch(this.buildWeatherQuery(coordinates)).then((res) => res.json());
        if (!response) {
          throw new Error("Weather data not found");
        }
        const currentWeather: Weather = this.parseCurrentWeather(response.list[0]);
        const forecast: Weather[] = this.buildForecastArray(currentWeather, response.list);
        return forecast;

      } catch (error) { 
        console.log(error);
        return error;
      }
    }
    private parseCurrentWeather(response: any) {
      const parseDate = dayjs.unix(response.dt).format("MM/DD/YYYY");
      const currentWeather = new Weather(
        this.city,
        parseDate,
        response.main.temp,
        response.wind.speed,
        response.main.humidity,
        response.weather[0].icon,
        response.weather[0].description || response.weather[0].main,
      );
      return currentWeather;
    }
    private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
      const weatherForcast: Weather[] = [currentWeather];
      const filterWeatherData = weatherData.filter((data: any) => data.dt_txt.includes("12:00:00"));

      for (const day of filterWeatherData) {
        weatherForcast.push(new Weather(this.city, dayjs.unix(day.dt).format("MM/DD/YYYY"), day.main.temp, day.wind.speed, day.main.humidity, day.weather[0].icon, day.weather[0].description || day.weather[0].main));
      }
      return weatherForcast;
    }
    async getWeatherForCity(city: string) {
      try {
        this.city = city;
        console.log(this.city);
        const coordinates = await this.fetchAndDestructureLocationData();
        console.log(coordinates);
        if (coordinates) {
          this.city = coordinates.name;
          const weather = await this.fetchWeatherData(coordinates);
          return weather;
        }
        throw new Error("Invalid city name");
      } catch (error) {
        console.log(error);
        throw error;
      }
    }    
}

export default new WeatherService();


// TODO: Complete the WeatherService class

// TODO: Define the baseURL, API key, and city name properties
  
  // TODO: Create fetchLocationData method
  


  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method

  
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
