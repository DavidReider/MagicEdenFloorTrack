# MagicEdenFloorTrack

The purpose of this repository is to create a simple website that has the ability to detect and notify users of collections on Magic Eden that have raising floor prices! 

Currently, it just pulls in collections where the current floor price is higher than the previous day's floor price based on the API that Magic Eden uses.

The future goals are:
- Add a database to store historical floor price values.
- Add a CRON Job to fetch 'current' floor price and detect changes hourly rather than comparing to previous day's floor price. This also cuts down on requests to the API.
- Add a system to notify you of projects that have significant changes in the past hour.
- Style the website (maybe convert to React and use components to style?)

Live Deployment: https://solanafloortracker.herokuapp.com/
