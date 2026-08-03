// AutoFlip CRM 2.0
// Финансы

function showFinance() {
    const stats = getAnalytics();

    document.getElementById("app").innerHTML = `
        <div class="card main-card">
            <div class="label">
                💰 Деньги в автомобилях
            </div>

            <div class="big-number">
                ${stats.moneyInCars.toLocaleString("ru-RU")} ₽
            </div>
        </div>

        <div class="stats">
            <div class="card">
                <div class="label">
                    🚗 Всего автомобилей
                </div>
                <div class="big-number">
                    ${stats.carsCount}
                </div>
            </div>

            <div class="card">
                <div class="label">
                    ✅ Продано
                </div>
                <div class="big-number">
                    ${stats.soldCars}
                </div>
            </div>
        </div>

        <div class="card">
            <h3>📊 Финансовый отчёт</h3>

            <p>
                В работе:
                <b>${stats.activeCars}</b>
            </p>

            <p>
                Всего вложено:
                <b>${stats.totalBuy.toLocaleString("ru-RU")} ₽</b>
            </p>

            <p>
                Расходы:
                <b>${stats.totalExpenses.toLocaleString("ru-RU")} ₽</b>
            </p>

            <p>
                Продажи:
                <b>${stats.totalSales.toLocaleString("ru-RU")} ₽</b>
            </p>

            <p class="profit">
                Прибыль: ${stats.totalProfit.toLocaleString("ru-RU")} ₽
            </p>
        </div>

        <div class="button" onclick="loadHome()">
            ← Главная
        </div>
    `;
}
