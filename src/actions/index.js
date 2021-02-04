export const ROOT_URL = 'https://wagon-garage-api.herokuapp.com/';
export const FETCH_CARS = 'FETCH_CARS';
export const CAR_CREATED = 'CAR_CREATED';

export function fetchCars(garage) {
  const promise = fetch(`${ROOT_URL}${garage}/cars`)
    .then(response => response.json());

  return {
    type: FETCH_CARS,
    payload: promise
  };
}

export function createCar(body, garage, callback) {
  const promise = fetch(`${ROOT_URL}${garage}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json())
    .then(callback);

  return {
    type: CAR_CREATED,
    payload: promise
  };
}
