// AutoFlip CRM 2.0
// Центральное хранилище данных

const STORAGE_KEY = "autoflip_cars";

function getCars() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return [];
        }

        const cars = JSON.parse(raw);
        return Array.isArray(cars) ? cars : [];
    } catch (error) {
        console.error("Ошибка чтения автомобилей:", error);
        return [];
    }
}

function saveCars(cars) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.isArray(cars) ? cars : []));
    } catch (error) {
        console.error("Ошибка сохранения автомобилей:", error);
        alert("Не удалось сохранить данные");
    }
}

function addCar(car) {
    const cars = getCars();

    const newCar = {
        id: Date.now(),
        createdAt: new Date().toLocaleDateString("ru-RU"),
        brand: "",
        model: "",
        year: "",
        mileage: "",
        vin: "",
        number: "",
        buyPrice: 0,
        status: "Куплено",
        expenses: 0,
        expensesList: [],
        salePrice: 0,
        profit: 0,
        investor: {
            name: "",
            amount: 0,
            percent: 30,
            paymentStatus: "Ожидает",
            paymentDate: ""
        },
        history: [],
        ...car
    };

    if (!newCar.history || !Array.isArray(newCar.history)) {
        newCar.history = [];
    }

    if (newCar.history.length === 0) {
        newCar.history.push({
            date: new Date().toLocaleDateString("ru-RU"),
            action: "Автомобиль создан"
        });
    }

    cars.push(newCar);
    saveCars(cars);
    return newCar;
}

function getCarById(id) {
    const cars = getCars();
    return cars.find(car => car.id == id);
}

function updateCar(updatedCar) {
    const cars = getCars();
    const index = cars.findIndex(car => car.id == updatedCar.id);

    if (index === -1) {
        return false;
    }

    cars[index] = updatedCar;
    saveCars(cars);
    return true;
}

function deleteCar(id) {
    const cars = getCars().filter(car => car.id != id);
    saveCars(cars);
}

function clearAllCars() {
    saveCars([]);
}
