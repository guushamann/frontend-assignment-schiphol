# Schiphol test

## How to run the project

Before you run this project, you need to run npm install in the root of the project.

Open a terminal and Turn on the server with `npm run server`.

Open another terminal and run `npm run dev` to start the project.

Open a browser and surf to http://localhost:5173/

If you want to run the tests, execute `npm run test`

## What did I build?

I have build a react application that can show flights by searching by location. You can sort the flight by date.

I used:

- Express.js to setup the smallest possible server for hosting the json file.
- Vitest to setup some unit tests for the main functionality of this app.
- Tailwind as a css utility library to speed up the css work.
- React Query to make the fetching of the data robust and it also helps to make the code more readable.

## Decisions

I doubted to create the project in Remix for a minute, to not be overwelmed by a new framework and focus on creating a clean and tested app, I decided to create a SPA.
I have focussed on functional unittests, with more time i would have added more component tests, the only "component" test in the project is a test for the useQuery hook.
I created a simple webserver for the "mock" of the data, in a reallife scenario i would create a real mockserver that can be used for development and for a playright e2e test suite.
