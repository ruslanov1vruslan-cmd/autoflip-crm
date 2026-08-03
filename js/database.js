// AutoFlip CRM 2.0
// Центральное хранилище


const STORAGE_KEY = "autoflip_cars";



function getCars(){

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        if(!data){
            return [];
        }


        return JSON.parse(data);


    } catch(error){

        console.error(
            "Ошибка загрузки данных",
            error
        );

        return [];

    }

}





function saveCars(cars){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cars)
    );

}





function addCar(car){


    const cars = getCars();


    car.id = Date.now();


    car.createdAt =
    new Date().toLocaleDateString();



    cars.push(car);


    saveCars(cars);


    return car;

}





function getCarById(id){


    const cars = getCars();


    return cars.find(
        car => car.id == id
    );


}





function updateCar(updatedCar){


    const cars = getCars();


    const index =
    cars.findIndex(
        car => car.id == updatedCar.id
    );


    if(index !== -1){

        cars[index] = updatedCar;

    }


    saveCars(cars);


}





function deleteCar(id){


    let cars = getCars();


    cars =
    cars.filter(
        car => car.id != id
    );


    saveCars(cars);


}
