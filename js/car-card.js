// AutoFlip CRM 2.0
// Автомобили + фильтры

function showCars(filter = "Все") {
    const cars = getCars();

    let filteredCars = cars;

    if (filter !== "Все") {
        filteredCars = cars.filter(car => car.status === filter);
    }

    let html = `
        <div class="card">
            <h2>🚗 Автомобили</h2>
            <div class="label">Всего автомобилей: ${cars.length}</div>
        </div>

        <div class="card">
            <div class="filter-row">
                <button onclick="showCars('Все')">Все (${cars.length})</button>
                <button onclick="showCars('Куплено')">💰 Куплено</button>
                <button onclick="showCars('Подготовка')">🔧 Подготовка</button>
                <button onclick="showCars('В продаже')">🟢 В продаже</button>
                <button onclick="showCars('Резерв')">🟡 Резерв</button>
                <button onclick="showCars('Продано')">✅ Продано</button>
            </div>
        </div>

        <div class="button" onclick="openNewDeal()">
            ➕ Добавить автомобиль
        </div>
    `;

    if (filteredCars.length === 0) {
        html += `
            <div class="card">
                <center>
                    🚗
                    <h3>Автомобилей нет</h3>
                    <p>В этом статусе машин нет</p>
                </center>
            </div>
        `;
    }

    filteredCars.forEach(car => {
        const profit = Number(car.profit || 0);

        html += `
            <div class="car-card" onclick="openCarCard(${car.id})">
                <h3>${car.brand || ""} ${car.model || ""}</h3>

                <span class="status ${getStatusClass(car.status)}">
                    ${getStatusIcon(car.status)}
                    ${car.status || "Без статуса"}
                </span>

                <br><br>

                <div>Год: ${car.year || "-"}</div>

                <br>

                <div>
                    VIN:
                    <b>${car.vin || "-"}</b>
                </div>

                <br>

                <div>
                    Номер:
                    <b>${car.number || "-"}</b>
                </div>

                <br>

                <div>
                    Покупка:
                    <b>${Number(car.buyPrice || 0).toLocaleString("ru-RU")} ₽</b>
                </div>

                <br>

                <div>
                    Расходы:
                    <b>${Number(car.expenses || 0).toLocaleString("ru-RU")} ₽</b>
                </div>

                <br>

                <div class="profit">
                    ${
                        car.status === "Продано" && profit > 0
                            ? "+" + profit.toLocaleString("ru-RU") + " ₽"
                            : "В процессе"
                    }
                </div>
            </div>
        `;
    });

    document.getElementById("app").innerHTML = html;
}

function getStatusClass(status) {
    switch (status) {
        case "В продаже":
            return "sale";
        case "Подготовка":
            return "prepare";
        case "Продано":
            return "sale";
        case "Резерв":
            return "prepare";
        case "Куплено":
            return "buy";
        default:
            return "buy";
    }
}

function getStatusIcon(status) {
    switch (status) {
        case "Куплено":
            return "💰";
        case "Подготовка":
            return "🔧";
        case "В продаже":
            return "🟢";
        case "Резерв":
            return "🟡";
        case "Продано":
            return "✅";
        default:
            return "🚗";
    }
}
