import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

class City {
  id: string;
  name: string;

  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private async read() {
    return await fs.readFile("db/db.json", "utf-8");
  }

  private async write(cities: City[]) {
    return await fs.writeFile("db/db.json", JSON.stringify(cities, null, 2));
  }

  async getCities() {
    return await this.read().then(cities => {
      let parsedCities: City[]
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (error) {
        console.log(error);


        parsedCities = [];
      }
      return parsedCities;
    })
  }
  async addCity(city: string) {
    if (!city) {
      throw new Error("City name is required");
    }
    const newCity: City = {name: city, id: uuidv4() };
    return await this.getCities().then(cities => {
      if (cities.find(index => index.name === city)) {
        return cities;
      }
      return [...cities, newCity];
    })
    .then(updatedCities => this.write(updatedCities))
    .then(() => newCity);
    }
      
  
  async removeCity(id: string) {
    return await this.getCities().then((cities) => {
      const updatedCities = cities.filter(city => city.id !== id);
      return this.write(updatedCities);
    });
  }
}

export default new HistoryService();



// TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file