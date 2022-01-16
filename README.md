# MagicEdenFloorTrack

The purpose of this repository is to create a simple website that has the ability to detect and notify users of collections on Magic Eden that have raising floor prices!

Currently, it just pulls in collections where the current floor price is higher than the previous day's floor price based on the API that Magic Eden uses.

The future goals are:

- Add a database to store historical floor price values. (Supabase integration in the works)
- Add a CRON Job to fetch 'current' floor price and detect changes hourly rather than comparing to previous day's floor price. This also cuts down on requests to the API. (setup to store in api.js, just need to deploy on a server that can run it hourly.)
- Add a system to notify you of projects that have significant changes in the past hour.
- Add innerpages for more detailed graph/history of floor price for a given collection.
- Style the website to look better.

Live Deployment: <https://solanafloortracker.netlify.app/>

## Getting Started

To open the **front end**, you will want to clone the repository, navitage into the `/floor-track/` folder, create a `.env` file and add missing API keys that you can get from the author of this project and then run the following to install dependencies:

```bash
$ npm i
```

and then start the front end server with

```bash
$ npm run start
```

To run the **API** for updating the prices in the background:

Ensure you are in the root of the document.

Create a `.env` file and add the missing api keys, that you can get from the author of this project.

Install dependencies with:

```bash
$ npm i
```

start the server with:

```bash
$ npm run start
```

## Contribution

(this section needs fleshed out)

1. fork the repository
2. git clone the forked repository
3. create a feature branch
4. make changes
5. push changes and create a pull request to the main repository
