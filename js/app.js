// AutoFlip CRM 2.0
// Главная страница

function loadHome() {
    const stats = getAnalytics();
    const cars = getCars();
    const recentCars = cars.slice().reverse().slice(0, 3);

    document.getElementById("app").innerHTML = `
        <div class="card main-card">
            <div class="label">💰 Деньги в автомобилях</div>
            <div class="big-number">${stats.moneyInCars.toLocaleString("ru-RU")} ₽</div>
        </div>

        <div class="stats">
            <div class="card">
                <div class="label">🚗 Автомобили</div>
                <div class="big-number">${stats.carsCount}</div>
            </div>

            <div class="card">
                <div class="label">📈 Прибыль</div>
                <div class="big-number">${stats.totalProfit.toLocaleString("ru-RU")} ₽</div>
            </div>
        </div>

        <div class="card">
            <div class="label">Последние автомобили</div>

            ${
                recentCars.length === 0
                    ? "<p>Нет автомобилей</p>"
                    : recentCars
                        .map(car => `
                            <div class="car-card" onclick="openCarCard(${car.id})">
                                <h3>${car.brand || ""} ${car.model || ""}</h3>

                                <span class="status ${getStatusClass(car.status)}">
                                    ${getStatusIcon(car.status)}
                                    ${car.status || "Без статуса"}
                                </span>

                                <br><br>

                                <div>Покупка: <b>${Number(car.buyPrice || 0).toLocaleString("ru-RU")} ₽</b></div>
                                <div>Расходы: <b>${Number(car.expenses || 0).toLocaleString("ru-RU")} ₽</b></div>
                            </div>
                        `)
                        .join("")
            }
        </div>

        <div class="button" onclick="openNewDeal()">
            ➕ Новая сделка
        </div>
    `;
}
