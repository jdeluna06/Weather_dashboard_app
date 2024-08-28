import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
// TODO: GET weather data from city name
  // TODO: save city to search history

router.post('/', (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;
    WeatherService.getWeatherForCity(cityName).then((data: any) => {
      HistoryService.addCity(data[0].city);
      res.json(data);
    }).catch((error) => {
    res.status(500).json(error);
    })
  });

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  HistoryService.getCities()
  .then((cities) => {
    return res.json(data);
}).catch((error) => {
  res.status(500).json(error);
  });
});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: "City ID is required" });
  }
   HistoryService.removeCity(req.params.id) .then(() => {
    res.json({ message: "City removed from history" });
    
  }
});

export default router;
