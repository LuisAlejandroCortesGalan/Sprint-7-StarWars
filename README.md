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
- Redux or Context for state management
- JSON-server-auth for authentication
- SWAPI API for starship data
- Firebase for user management
- Storybook for component development
- Jest for unit testing

## How to Run the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Crear y configurar en la raiz el documento firebase.ts 
4. Poner en el .env la api
3. Start the development server: `npm run dev`
4. (Optional) Run Storybook: `npm run storybook`

## API Usage

- **Get Starships:** `https://swapi.dev/api/starships/`
- **Paginated Starships:** `https://swapi.dev/api/starships/?page=1`
- **Starship Images:** `https://starwars-visualguide.com`

## Future Improvements

- Infinite scroll for better UX
- More styling refinements
- Additional unit tests

---

Made with ❤️ by a Star Wars fan!

