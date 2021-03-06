# FoodCycle_Expo
Mobile App Idea inspired to connect supermarkets, restaurants, and farms with foodbanks and nonprofit organizations city-wide.

## Motivation 
40% of foodwaste worldwide is produced in the US

40% of foodwaste in US is at the levels of retailers and restaurants. 

## Setup 
- install expo 
  - `npm install -g expo-cli`
- insert google maps apki key in `app.json` and `FindNearYou.js` where is says `PUT_GOOGLE_MAPS_KEY_HERE_IN_QUOTATIONS`
- If running on Mac, open simulator 
- To run on android, install android studio and set up simulator 
- `npm install`
- `react-native link`
- in app.json and FindNearYou.js, insert google maps api key at `INSERT_GOOGLE_MAPS_API_KEY_HERE`

## To run:
- expo start
- select i for ios to open simulator 

## API Reference
Uses a backend API using Django with Postgresql database. 
Link to to API:
- [Github](https://github.com/hertweckhr1/api_foodcycle)
- [Direct Link](http://104.199.122.67:8000/api/user/donee-info/)

## Screenshots
![Log In](https://media.giphy.com/media/ftdik1dTsVRn2xZ7aR/giphy.gif)
![Add Donation](https://media.giphy.com/media/BZhrlNyvQwqNnrcwP8/giphy.gif)

![Map Search](https://media.giphy.com/media/foaUOeBa6S98kBY0cD/giphy.gif)
![Search](https://media.giphy.com/media/69zP23XNbqVeDwbWqA/giphy.gif)
