// AutoFlip CRM 2.0
// Создание новой сделки

function openNewDeal() {
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>➕ Новая сделка</h2>

            <div class="label">Марка</div>
            <input id="brand" class="input" type="text" placeholder="BMW">

            <div class="label">Модель</div>
            <input id="model" class="input" type="text" placeholder="X5">

            <div class="label">Год</div>
            <input id="year" class="input" type="number" min="1900" max="2100" placeholder="2020">

            <div class="label">Пробег</div>
            <input id="mileage" class="input" type="number" min="0" placeholder="85000">

            <div class="label">VIN</div>
            <input id="vin" class="input" type="text" placeholder="WBA...">

            <div class="label">Госномер</div>
            <input id="number" class="input" type="text" placeholder="А123ВС">

            <div class="label">Цена покупки</div>
            <input id="buyPrice" class="input" type="number" min="0" placeholder="3000000">

            <div class="label">Статус</div>
            <select id="status" class="input">
                <option value="Куплено">Куплено</option>
                <option value="Подготовка">Подготовка</option>
                <option value="В продаже">В продаже</option>
                <option value="Резерв">Резерв</option>
            </select>

            <div class="button" onclick="createCar()">
                Создать автомобиль
            </div>

            <div class="button" onclick="goBack()">
                ← Назад
            </div>
        </div>
    `;
}

function createCar() {
    const brand = document.getElementById("brand").value.trim();
    const model = document.getElementById("model").value.trim();
    const year = document.getElementById("year").value.trim();
    const mileage = document.getElementById("mileage").value.trim();
    const vin = document.getElementById("vin").value.trim();
    const number = document.getElementById("number").value.trim();
    const buyPrice = Number(document.getElementById("buyPrice").value || 0);
    const status = document.getElementById("status").value;

    if (!brand) {
        alert("Введите марку автомобиля");
        return;
    }

    if (!model) {
        alert("Введите модель автомобиля");
        return;
    }

    if (!year) {
        alert("Введите год автомобиля");
        return;
    }

    if (!buyPrice || buyPrice <= 0) {
        alert("Введите цену покупки");
        return;
    }

    const car = {
        brand,
        model,
        year,
        mileage,
        vin,
        number,
        buyPrice,
        status,
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
        history: [
            {
                date: new Date().toLocaleDateString("ru-RU"),
                action: "Автомобиль создан"
            }
        ]
    };

    const cars = getCars();
    car.id = Date.now();
    cars.push(car);
    saveCars(cars);

    alert("Автомобиль добавлен");
    showCars();
}
