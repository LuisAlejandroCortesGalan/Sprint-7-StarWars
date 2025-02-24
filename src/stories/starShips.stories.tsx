import { Meta, StoryFn } from '@storybook/react';
import StarShips from '../components/StarShips';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

// Mock de los datos de las naves
const mockStarships = [
  { name: 'Millennium Falcon', model: 'YT-1300 light freighter' },
  { name: 'X-Wing', model: 'T-65 X-wing starfighter' },
];

// Meta de Storybook
export default {
  title: 'Star Wars/StarShips',
  component: StarShips,
} as Meta;

// Plantilla común para las historias
const Template: StoryFn = (args) => <StarShips {...args} />;

// Historia para el estado de carga
export const LoadingState = Template.bind({});
LoadingState.args = {
  starShips: [],
  isLoading: true,
  loadingMessage: 'Cargando naves...', // Mensaje de carga visual
};

// Historia para cuando no hay naves disponibles
export const NoStarshipsAvailable = Template.bind({});
NoStarshipsAvailable.args = {
  starShips: [],
  isLoading: false,
  error: 'No hay naves disponibles.', // Mensaje de error si es necesario
};

// Historia para cuando hay naves disponibles
export const WithAvailableStarships = Template.bind({});
WithAvailableStarships.args = {
  starShips: mockStarships,
  isLoading: false,
};

// Historia para cuando una nave está seleccionada
export const WithFirstShipSelected = Template.bind({});
WithFirstShipSelected.args = {
  starShips: mockStarships,
  isLoading: false,
  selectedShip: 0, // Selecciona la primera nave
};
WithFirstShipSelected.argTypes = {
  selectedShip: { control: 'number' },  // Control interactivo para cambiar la nave seleccionada
};

// Historia para simular un error de carga
export const LoadError = Template.bind({});
LoadError.args = {
  starShips: [],
  isLoading: false,
  error: 'No se pudieron cargar las naves.', // Error simulado
};
