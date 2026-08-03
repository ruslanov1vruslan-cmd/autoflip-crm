// AutoFlip CRM 2.0
// Карточка автомобиля

function openCarCard(id) {
    const car = getCarById(id);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const econ = getCarEconomics(car);

    const investorName = car.investor && car.investor.name ? car.investor.name : "—";
    const investorPercent = Number(car.investor && car.investor.percent ? car.investor.percent : 0);
    const investorStatus = car.investor && car.investor.paymentStatus ? car.investor.paymentStatus : "Ожидает";

    const historyHtml = renderCarHistory(car);

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>${car.brand || ""} ${car.model || ""}</h2>

            <span class="status ${cardGetStatusClass(car.status)}">
                ${cardGetStatusIcon(car.status)}
                ${car.status || "Без статуса"}
            </span>

            <br><br>

            <div class="label">Основная информация</div>
            <br>

            <p>Год: <b>${car.year || "-"}</b></p>
            <p>Пробег: <b>${car.mileage || 0} км</b></p>
            <p>VIN: <b>${car.vin || "-"}</b></p>
            <p>Госномер: <b>${car.number || "-"}</b></p>
        </div>

        <div class="card">
            <h3>💰 Финансы</h3>

            <p>Покупка: <b>${econ.buy.toLocaleString("ru-RU")} ₽</b></p>
            <p>Расходы: <b>${econ.expenses.toLocaleString("ru-RU")} ₽</b></p>
            <p>Себестоимость: <b>${(econ.buy + econ.expenses).toLocaleString("ru-RU")} ₽</b></p>
            <p>Продажа: <b>${econ.sale.toLocaleString("ru-RU")} ₽</b></p>

            <p>Валовая прибыль: <b>${econ.grossProfit.toLocaleString("ru-RU")} ₽</b></p>
            <p>Доля инвестора: <b>${econ.investorPayout.toLocaleString("ru-RU")} ₽</b></p>
            <p class="profit">Прибыль владельца: ${econ.ownerProfit.toLocaleString("ru-RU")} ₽</p>
        </div>

        <div class="card">
            <h3>👤 Инвестор</h3>
            <p>Имя: <b>${escapeCardHtml(investorName)}</b></p>
            <p>Доля: <b>${investorPercent}%</b></p>
            <p>К выплате: <b>${econ.investorPayout.toLocaleString("ru-RU")} ₽</b></p>
            <p>Статус выплаты: <b>${escapeCardHtml(investorStatus)}</b></p>
        </div>

        <div class="button" onclick="addExpenseForm(${car.id})">
            💸 Добавить расход
        </div>

        <div class="button" onclick="changeStatusForm(${car.id})">
            🔄 Изменить статус
        </div>

        <div class="button" onclick="sellCarForm(${car.id})">
            💰 Продать автомобиль
        </div>

        <div class="button" onclick="showInvestorPayment(${car.id})">
            👤 Инвестор
        </div>

        <div class="button" onclick="openEditCarForm(${car.id})">
            ✏️ Редактировать
        </div>

        <div class="button" onclick="deleteCarConfirm(${car.id})">
            🗑 Удалить
        </div>

        <div class="card">
            <h3>📜 История</h3>
            ${historyHtml}
        </div>

        <div class="button" onclick="showCars()">
            ← Назад к автомобилям
        </div>
    `;
}

function openEditCarForm(id) {
    const car = getCarById(id);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>✏️ Редактировать автомобиль</h2>

            <div class="label">Марка</div>
            <input id="editBrand" class="input" value="${escapeCardHtml(car.brand || "")}">

            <div class="label">Модель</div>
            <input id="editModel" class="input" value="${escapeCardHtml(car.model || "")}">

            <div class="label">Год</div>
            <input id="editYear" class="input" value="${escapeCardHtml(car.year || "")}">

            <div class="label">Пробег</div>
            <input id="editMileage" class="input" value="${escapeCardHtml(car.mileage || "")}">

            <div class="label">VIN</div>
            <input id="editVin" class="input" value="${escapeCardHtml(car.vin || "")}">

            <div class="label">Госномер</div>
            <input id="editNumber" class="input" value="${escapeCardHtml(car.number || "")}">

            <div class="label">Цена покупки</div>
            <input id="editBuyPrice" class="input" type="number" min="0" value="${Number(car.buyPrice || 0)}">

            <div class="button" onclick="saveEditCar(${car.id})">
                Сохранить изменения
            </div>

            <div class="button" onclick="openCarCard(${car.id})">
                ← Назад
            </div>
        </div>
    `;
}

function saveEditCar(id) {
    const cars = getCars();
    const car = cars.find(item => item.id == id);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    car.brand = document.getElementById("editBrand").value.trim();
    car.model = document.getElementById("editModel").value.trim();
    car.year = document.getElementById("editYear").value.trim();
    car.mileage = document.getElementById("editMileage").value.trim();
    car.vin = document.getElementById("editVin").value.trim();
    car.number = document.getElementById("editNumber").value.trim();
    car.buyPrice = Number(document.getElementById("editBuyPrice").value || 0);

    if (!Array.isArray(car.history)) {
        car.history = [];
    }

    car.history.push({
        date: new Date().toLocaleDateString("ru-RU"),
        action: "Автомобиль отредактирован"
    });

    saveCars(cars);
    alert("Изменения сохранены");
    openCarCard(id);
}

function deleteCarConfirm(id) {
    const car = getCarById(id);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const ok = confirm(`Удалить автомобиль ${car.brand || ""} ${car.model || ""}?`);
    if (!ok) return;

    const cars = getCars().filter(item => item.id != id);
    saveCars(cars);

    alert("Автомобиль удалён");
    showCars();
}

function renderCarHistory(car) {
    if (!Array.isArray(car.history) || car.history.length === 0) {
        return `<p>Пока нет событий</p>`;
    }

    return car.history
        .slice()
        .reverse()
        .map(item => `
            <div class="card">
                <b>${escapeCardHtml(item.date || "")}</b>
                <br><br>
                ${escapeCardHtml(item.action || "")}
            </div>
        `)
        .join("");
}

function cardGetStatusClass(status) {
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

function cardGetStatusIcon(status) {
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

function escapeCardHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
