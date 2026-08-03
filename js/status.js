// AutoFlip CRM 2.0
// Статусы автомобиля

function changeStatusForm(carId) {
    const car = getCarById(carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>🔄 Новый статус</h2>

            <div class="label">Автомобиль</div>
            <p><b>${car.brand || ""} ${car.model || ""}</b></p>

            <div class="label">Выберите статус</div>
            <select id="newStatus" class="input">
                <option value="Куплено" ${car.status === "Куплено" ? "selected" : ""}>Куплено</option>
                <option value="Подготовка" ${car.status === "Подготовка" ? "selected" : ""}>Подготовка</option>
                <option value="В продаже" ${car.status === "В продаже" ? "selected" : ""}>В продаже</option>
                <option value="Резерв" ${car.status === "Резерв" ? "selected" : ""}>Резерв</option>
                <option value="Продано" ${car.status === "Продано" ? "selected" : ""}>Продано</option>
            </select>

            <div class="button" onclick="saveStatus(${car.id})">
                Изменить статус
            </div>

            <div class="button" onclick="openCarCard(${car.id})">
                ← Назад
            </div>
        </div>
    `;
}

function saveStatus(carId) {
    const cars = getCars();
    const car = cars.find(item => item.id == carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const oldStatus = car.status || "";
    const newStatus = document.getElementById("newStatus").value;

    if (!newStatus) {
        alert("Выберите статус");
        return;
    }

    if (oldStatus === newStatus) {
        alert("Статус уже установлен");
        return;
    }

    car.status = newStatus;

    if (!Array.isArray(car.history)) {
        car.history = [];
    }

    car.history.push({
        date: new Date().toLocaleDateString("ru-RU"),
        action: `Статус изменён: ${oldStatus || "—"} → ${newStatus}`
    });

    saveCars(cars);

    alert("Статус обновлён");
    openCarCard(carId);
}
