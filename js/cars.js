// AutoFlip CRM 2.0
// Автомобили + фильтры + поиск

let currentCarFilter = "Все";
let currentCarSearch = "";

function showCars(filter = currentCarFilter, search = currentCarSearch) {
    currentCarFilter = filter;
    currentCarSearch = search;

    const cars = getCars();

    let filteredCars = cars;

    if (filter !== "Все") {
        filteredCars = filteredCars.filter(car => car.status === filter);
    }

    const q = (search || "").trim().toLowerCase();

    if (q) {
        filteredCars = filteredCars.filter(car => {
            const haystack = [
                car.brand,
                car.model,
                car.year,
                car.mileage,
                car.vin,
                car.number,
                car.buyPrice,
                car.status
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return haystack.includes(q);
        });
    }

    let html = `
        <div class="card">
            <h2>🚗 Автомобили</h2>
            <div class="label">Всего автомобилей: ${cars.length}</div>
        </div>

        <div class="card">
            <input
                class="input"
                id="carSearchInput"
                value="${escapeHtml(currentCarSearch)}"
                placeholder="Поиск: марка, модель, VIN, номер..."
                oninput="showCars(currentCarFilter, this.value)"
            >

            <div class="filter-row">
                <button onclick="showCars('Все', document.getElementById('carSearchInput').value)">Все (${cars.length})</button>
                <button onclick="showCars('Куплено', document.getElementById('carSearchInput').value)">💰 Куплено</button>
                <button onclick="showCars('Подготовка', document.getElementById('carSearchInput').value)">🔧 Подготовка</button>
                <button onclick="showCars('В продаже', document.getElementById('carSearchInput').value)">🟢 В продаже</button>
                <button onclick="showCars('Резерв', document.getElementById('carSearchInput').value)">🟡 Резерв</button>
                <button onclick="showCars('Продано', document.getElementById('carSearchInput').value)">✅ Продано</button>
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
                    <p>В этом статусе или по такому запросу машин нет</p>
                </center>
            </div>
        `;
    }

    filteredCars.forEach(car => {
        html += `
            <div class="car-card" onclick="openCarCard(${car.id})">
                <h3>${car.brand || ""} ${car.model || ""}</h3>

                <span class="status ${getStatusClass(car.status)}">
                    ${getStatusIcon(car.status)}
                    ${car.status || "Без статуса"}
                </span>

                <br><br>

                <div>${car.year || "-"} год</div>

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
                    <b>${Number(car.buyPrice || 0).toLocaleString()} ₽</b>
                </div>

                <br>

                <div>
                    Расходы:
                    <b>${Number(car.expenses || 0).toLocaleString()} ₽</b>
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

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
