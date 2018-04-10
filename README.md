# EventManager
[![Build Status](https://travis-ci.org/Pattonville-App-Development-Team/event-manager.svg?branch=master)](https://travis-ci.org/Pattonville-App-Development-Team/event-manager)

Front-end of the school event management system using Google and Auth0 for authentication. The goal is to improve the experience of people attending school events, such as Prom or Homecoming, by speeding up the ticket sales/check in process. Additionally, this system removes the need for a million spreadsheets in order to run the event and provides a simpler platform for volunteers/event coordinators to use.

Data persistance (Event Data, Attendees, Students) and User Authentication are handled [by the api.](http://github.com/Pattonville-App-Development-Team/event-manager-api "Event Manager Api") Not only is this used to save event data, but it is also used to check the eligibility of each student as they attempt to register as an attendee of the event.

## Development Server

1. Run `npm install` to install/update packages.
2. Use `npm start` to run the development server.

## Production Server

This project comes with a Dockerfile, so it can easily be built and ran in a container.
1. `git clone https://github.com/Pattonville-App-Development-Team/event-manager.git`
2. `cd event-manager`
3. `docker build -t event-manager .`
4. `docker run -p 80:80 event-manager`

If you just want to run a production build, do `npm run build -- --prod`.

### Configuration

The API URL and the Auth0 ClientID must be correctly set in the environment files or the webapp will not work.
