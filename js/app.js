// AutoFlip CRM 2.0
// Главная страница

function loadHome() {
    const stats = getAnalytics();
    const cars = getCars();
    const recentCars = cars.slice().reverse().slice(0, 3);

    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);

    const monthReport = typeof getFinanceReport === "function"
        ? getFinanceReport(currentYear, currentMonth)
        : null;

    const monthName = typeof getMonthName === "function"
        ? getMonthName(Number(currentMonth))
        : `${currentMonth}.`;

    const monthProfit = monthReport ? monthReport.ownerProfit : 0;

    document.getElementById("app").innerHTML = `
        <div class="card main-card">
            <div class="label">💰 Деньги в автомобилях</div>
            <div class="big-number">${stats.moneyInCars.toLocaleString("ru-RU")} ₽</div>
        </div>

        <div class="stats">
            <div class="card" onclick="showCars()" style="cursor:pointer;">
                <div class="label">🚗 Автомобили</div>
                <div class="big-number">${stats.carsCount}</div>
            </div>

            <div class="card" onclick="showFinance()" style="cursor:pointer;">
                <div class="label">📈 Прибыль</div>
                <div class="big-number">${stats.totalProfit.toLocaleString("ru-RU")} ₽</div>
            </div>
        </div>

        <div class="card" onclick="showFinance('${currentYear}', '${currentMonth}')" style="cursor:pointer;">
            <div class="label">📅 Прибыль за ${monthName} ${currentYear}</div>
            <div class="big-number">${monthProfit.toLocaleString("ru-RU")} ₽</div>
            <div class="label">Это прибыль владельца уже без доли инвестора</div>
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

                                <div>
                                    Покупка:
                                    <b>${Number(car.buyPrice || 0).toLocaleString("ru-RU")} ₽</b>
                                </div>

                                <div>
                                    Расходы:
                                    <b>${Number(car.expenses || 0).toLocaleString("ru-RU")} ₽</b>
                                </div>
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
