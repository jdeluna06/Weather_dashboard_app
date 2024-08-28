// TODO: Define a City class with name and id properties
import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

// TODO: Complete the HistoryService class
class HistoryService {
  private async read() {
    return await fs.readFile("db.jason", JSON.stringify(cities, null, 2));
  }

  private async write(cities: City[]) {
    return await fs.writeFile("db.jason", JSON.stringify(cities, null, 2));
  }

  async getCities() {
    return await this.read().then(cities) => {
    let parsedCities: City[]
    try {
      parsedCities = [].concat(JSON.parse(cities));
    } catch (error) {
      parsedCities = [];
    }
    return parsedCities;
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
