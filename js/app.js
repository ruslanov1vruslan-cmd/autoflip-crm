// AutoFlip CRM 2.0

function openNewDeal(){

    document.getElementById("app").innerHTML = `

    <div class="card">

    <h2>Новый автомобиль</h2>


    <input id="brand" placeholder="Марка">


    <input id="model" placeholder="Модель">


    <input id="year" placeholder="Год">


    <input id="mileage" placeholder="Пробег">


    <input id="vin" placeholder="VIN">


    <input id="number" placeholder="Госномер">


    <input id="buyPrice" placeholder="Цена покупки">


    <button onclick="saveNewCar()">
    Сохранить автомобиль
    </button>


    </div>

    `;
}



function saveNewCar(){

    const car = {

        brand:
        document.getElementById("brand").value,


        model:
        document.getElementById("model").value,


        year:
        document.getElementById("year").value,


        mileage:
        document.getElementById("mileage").value,


        vin:
        document.getElementById("vin").value,


        number:
        document.getElementById("number").value,


        buyPrice:
        document.getElementById("buyPrice").value,


        status:
        "Куплено"

    };


    addCar(car);


    alert("Автомобиль добавлен");


    loadHome();

}



function loadHome(){

    const cars = getCars();


    document.getElementById("app").innerHTML = `


    <div class="card">

    💰 Деньги в автомобилях

    <div class="big-number">
    0 ₽
    </div>

    </div>



    <div class="stats">


    <div class="card">

    🚗 Автомобили

    <div class="big-number">
    ${cars.length}
    </div>

    </div>



    <div class="card">

    📈 Прибыль

    <div class="big-number">
    0 ₽
    </div>

    </div>


    </div>



    <div class="button"
    onclick="openNewDeal()">

    ➕ Новая сделка

    </div>


    `;

}
