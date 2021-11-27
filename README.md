# MagicEdenFloorTrack

The purpose of this repository is to create a simple website that has the ability to detect and notify users of collections on Magic Eden that have raising floor prices! 

Currently, it just pulls in collections where the current floor price is higher than the previous day's floor price based on the API that Magic Eden uses.

The goals of this project (in order of importance):
- Add a database to store historical floor price values (Supabase) - in progress
- Add a CRON Job to fetch floor price and collect changes hourly rather than comparing to previous day's floor price. This also cuts down on requests to the API. - in progress
  - Along with this, we will want to convert the project to React (in progress) and host somewhere we can run a CRON Job. 
- Add a system to notify you of projects that have significant changes in the past hour. - not started

Live Deployment: https://solanafloortracker.netlify.app/

Contribution:
(this section needs fleshed out)
1. git clone the repository
2. run 'npm install' within the repository
3. create a feature branch
4. make changes
5. push changes and create a pull request
