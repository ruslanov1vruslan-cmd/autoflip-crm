// AutoFlip CRM 2.0
// Хранилище данных

function getCars() {
    const cars = localStorage.getItem("autoflip_cars");

    if (cars) {
        return JSON.parse(cars);
    }

    return [];
}


function saveCars(cars) {
    localStorage.setItem(
        "autoflip_cars",
        JSON.stringify(cars)
    );
}


function addCar(car) {

    const cars = getCars();

    car.id = Date.now();

    cars.push(car);

    saveCars(cars);

    return car;
}
