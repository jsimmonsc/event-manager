# EventManager
[![Build Status](https://travis-ci.org/Pattonville-App-Development-Team/event-manager.svg?branch=master)](https://travis-ci.org/Pattonville-App-Development-Team/event-manager)

School event management system using Google and Auth0 for authentication. The goal is to improve the experience of people attending school events, such as Prom or Homecoming, by speeding up the ticket sales/check in process. Additionally, this system removes the need for a million spreadsheets in order to run the event and provides a simpler platform for volunteers/event coordinators to use.

Data persistance (Event Data, Attendees, Students) and User Authentication are handled by the api. Not only is this used to save event data, but it is also used to check the eligibility of each student as they attempt to register as an attendee of the event.

The Student Updater updates the database with eligibility data on each student at Pattonville.

## Development Server

1. Run `npm install` to install/update packages in each directory.
2. Use `npm start` to run the development server in each directory.

Running a development requires a local install of mongo.

## Production Server

This project comes with a Docker Compose file, so it can easily be built and ran in multiple containers.
1. `git clone https://github.com/Pattonville-App-Development-Team/event-manager.git`
2. `docker-compose up -d`

This builds and runs each server. The backend defaults to port 3000 and the frontend defaults to port 80. This also creates a mongo database for the app the use. The database data should generate in folder called volumes.

### Configuration

- On the frontend, the environment.prod.ts file must have the correct API URL and Auth0 ClientID.
- On the updater, the config.js file must have the correct powerschool api urls.

### How to Run Database Backups

This repository comes with a backup.sh script. When ran, the script will run a backup of the mongo container's database and saves it in a tarball in the volumes folder. Additionally, the script will delete backups that are over 2 weeks old. I recommend creating a cron job for this script to run every day.

## How to Use

[Visit our user guide here.](./USERGUIDE.md)
