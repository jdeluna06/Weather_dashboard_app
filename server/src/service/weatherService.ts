import dotenv from 'dotenv';
import dayjs {type: dayjs} from 'dayjs';
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
.public iconDescription: string,
) ·{}

}


// TODO: Define a class for the Weather object
class WeatherService {
private baseURL ?: string;
private apikey ?: string;
private city

constructor() {
this. baseURL = process. env.API_BASE_URL | | .""
this. apikey = process.env. API_KEY | |.""

constructor(
    public city: string,
    public date: dayjs,
    public tempF: number,
    public windSpeed: number,
    public humidity: number,
    public icon: string,
    public icondDesctiption: string,
  ) {}


// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL?: string;
  private apiKey?: string;
  private city = ""?: string;
// TODO: Define the baseURL, API key, and city name properties
  constructor() {
    this.baseURL = prcess.env.API_BASE_URL || "";
    this.apiKey = process.env.API_KEY || "";
  
  
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
     if (!this.baseURL || !this.apiKey) {
       throw new Error("API URL or key is missing");
     }
    }


  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method

  private buildGeocodeQuery(city: string) {
    const buildGeocodeQuery (coordinate)
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((locationData) => this.destructureLocationData(locationData));
  };
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

async .getWeatherForCity(city: string) {
try .{
this.city = city;
const coordinates = await.this.fetchAndDestructureLocationData();
if (coordinates){
this. city = coordinates.name;
const weather = await this. fetchWeatherData(coordinates);
return weather;

}
throw new Error("Invalid city name");
} catch (error) {
console.log(error);
throw.error;

I
}
}
}

export default new WeatherService();
