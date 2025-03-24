# Star Wars Ships Project

This project is a React app that displays a list of Star Wars starships using the SWAPI API. Users can browse the ships, view details, and see related pilots and movies.

## Features

- Fetch and display a list of Star Wars starships
- View detailed information about each ship
- Load more ships with pagination
- User authentication (Login/Register)
- Protected routes for registered users
- Styled to match the Star Wars theme

## Technologies Used

- React (with React Router for navigation)
- Context for state management
- JSON-server-auth for authentication
- SWAPI API for starship data
- Firebase for user management
- Storybook for component development
- Jest for unit testing

## How to Run the Project

1. Clone the repository
    git clone https://github.com/LuisAlejandroCortesGalan/Sprint-7-StarWars.git
2. Join into the repository with: cd "name of the repository"
2. Install dependencies: `npm install`
3. Create and setup the file at the root firebase.ts 

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }

4. Create the .env file ar the root and link the api VITE_STARSHIPS_API=https://swapi.dev/api/starships and 

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

5. Start the development server: `npm run dev`
6. (Optional) Run Storybook: `npm run storybook`

## API Usage

- **Get Starships:** `https://swapi.dev/api/starships/`
- **Paginated Starships:** `https://swapi.dev/api/starships/?page=1`
- **Starship Images:** `https://starwars-visualguide.com`

## Future Improvements

- More styling refinements
- Additional unit tests


