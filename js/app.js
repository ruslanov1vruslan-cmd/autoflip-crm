// AutoFlip CRM 2.0
// Главная страница

function loadHome() {
    const stats = getAnalytics();
    const now = new Date();

    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);

    const monthReport = typeof getFinanceReport === "function"
        ? getFinanceReport(currentYear, currentMonth)
        : null;

    const monthName = typeof getMonthName === "function"
        ? getMonthName(Number(currentMonth))
        : `${currentMonth}.`;

    const ownerMonthProfit = monthReport ? monthReport.ownerProfit : 0;

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
                <div class="label">📈 Общая прибыль владельца</div>
                <div class="big-number">${stats.totalProfit.toLocaleString("ru-RU")} ₽</div>
            </div>
        </div>

        <div class="card" onclick="showFinance('${currentYear}', '${currentMonth}')" style="cursor:pointer;">
            <div class="label">📅 Прибыль владельца за ${monthName} ${currentYear}</div>
            <div class="big-number">${ownerMonthProfit.toLocaleString("ru-RU")} ₽</div>
            <div class="label">Без доли инвестора</div>
        </div>

        <div class="button" onclick="openNewDeal()">
            ➕ Новая сделка
        </div>
    `;
}
