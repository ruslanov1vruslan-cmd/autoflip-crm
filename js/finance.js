// AutoFlip CRM 2.0
// Финансы с выбором года и месяца

let financeSelectedYear = String(new Date().getFullYear());
let financeSelectedMonth = "all";

function showFinance(year = financeSelectedYear, month = financeSelectedMonth) {
    const cars = getCars();
    const years = getFinanceYears(cars);
    const currentStats = getAnalytics();

    financeSelectedYear = String(year || financeSelectedYear || new Date().getFullYear());
    financeSelectedMonth = String(month || financeSelectedMonth || "all");

    if (!years.includes(financeSelectedYear)) {
        financeSelectedYear = years[0] || String(new Date().getFullYear());
    }

    const report = getFinanceReport(financeSelectedYear, financeSelectedMonth);

    const yearOptions = years
        .map(y => `<option value="${y}" ${String(y) === String(financeSelectedYear) ? "selected" : ""}>${y}</option>`)
        .join("");

    const monthOptions = [
        `<option value="all" ${financeSelectedMonth === "all" ? "selected" : ""}>Все месяцы</option>`,
        `<option value="1" ${financeSelectedMonth === "1" ? "selected" : ""}>Январь</option>`,
        `<option value="2" ${financeSelectedMonth === "2" ? "selected" : ""}>Февраль</option>`,
        `<option value="3" ${financeSelectedMonth === "3" ? "selected" : ""}>Март</option>`,
        `<option value="4" ${financeSelectedMonth === "4" ? "selected" : ""}>Апрель</option>`,
        `<option value="5" ${financeSelectedMonth === "5" ? "selected" : ""}>Май</option>`,
        `<option value="6" ${financeSelectedMonth === "6" ? "selected" : ""}>Июнь</option>`,
        `<option value="7" ${financeSelectedMonth === "7" ? "selected" : ""}>Июль</option>`,
        `<option value="8" ${financeSelectedMonth === "8" ? "selected" : ""}>Август</option>`,
        `<option value="9" ${financeSelectedMonth === "9" ? "selected" : ""}>Сентябрь</option>`,
        `<option value="10" ${financeSelectedMonth === "10" ? "selected" : ""}>Октябрь</option>`,
        `<option value="11" ${financeSelectedMonth === "11" ? "selected" : ""}>Ноябрь</option>`,
        `<option value="12" ${financeSelectedMonth === "12" ? "selected" : ""}>Декабрь</option>`
    ].join("");

    const periodTitle = financeSelectedMonth === "all"
        ? `Все месяцы ${financeSelectedYear}`
        : `${getMonthName(Number(financeSelectedMonth))} ${financeSelectedYear}`;

    document.getElementById("app").innerHTML = `
        <div class="card main-card">
            <div class="label">💰 Деньги в автомобилях</div>
            <div class="big-number">${currentStats.moneyInCars.toLocaleString("ru-RU")} ₽</div>
        </div>

        <div class="card">
            <h3>📊 Период отчёта</h3>

            <div class="label">Год</div>
            <select
                id="financeYearSelect"
                class="input"
                onchange="showFinance(this.value, document.getElementById('financeMonthSelect').value)"
            >
                ${yearOptions}
            </select>

            <div class="label">Месяц</div>
            <select
                id="financeMonthSelect"
                class="input"
                onchange="showFinance(document.getElementById('financeYearSelect').value, this.value)"
            >
                ${monthOptions}
            </select>

            <div class="label">Выбранный период</div>
            <p><b>${periodTitle}</b></p>
        </div>

        <div class="stats">
            <div class="card">
                <div class="label">Продажи в периоде</div>
                <div class="big-number">${report.soldCount}</div>
                <div class="label">${report.totalSales.toLocaleString("ru-RU")} ₽</div>
            </div>

            <div class="card">
                <div class="label">Валовая прибыль</div>
                <div class="big-number">${report.grossProfit.toLocaleString("ru-RU")} ₽</div>
                <div class="label">До инвесторов</div>
            </div>

            <div class="card">
                <div class="label">Начислено инвесторам</div>
                <div class="big-number">${report.investorPayout.toLocaleString("ru-RU")} ₽</div>
                <div class="label">Доля по сделкам</div>
            </div>

            <div class="card">
                <div class="label">Прибыль владельца</div>
                <div class="big-number">${report.ownerProfit.toLocaleString("ru-RU")} ₽</div>
                <div class="label">Это уже без доли инвестора</div>
            </div>
        </div>

        <div class="card">
            <h3>📈 Оборот периода</h3>
            <p>Покупки: <b>${report.totalBuy.toLocaleString("ru-RU")} ₽</b></p>
            <p>Расходы: <b>${report.totalExpenses.toLocaleString("ru-RU")} ₽</b></p>
            <p>Продажи: <b>${report.totalSales.toLocaleString("ru-RU")} ₽</b></p>
            <p>В работе сейчас: <b>${report.activeCars}</b></p>
            <p>Продано всего: <b>${report.soldCars}</b></p>
        </div>

        <div class="card">
            <h3>👤 Инвесторы</h3>
            <p>Выплачено инвесторам: <b>${report.investorPaid.toLocaleString("ru-RU")} ₽</b></p>
            <p>Ожидает выплаты: <b>${report.investorDue.toLocaleString("ru-RU")} ₽</b></p>

            <div class="label" style="margin-top:12px;">Анализ заработка инвесторов</div>
            ${renderInvestorRows(report.investors)}
        </div>

        <div class="button" onclick="loadHome()">
            ← Главная
        </div>
    `;
}

function renderInvestorRows(investors) {
    if (!investors || investors.length === 0) {
        return `<p>Нет данных по инвесторам за выбранный период</p>`;
    }

    return investors.map(item => `
        <div class="card" style="padding:16px; margin-top:12px;">
            <h4 style="margin:0 0 8px 0;">${escapeFinanceHtml(item.name || "Без имени")}</h4>
            <p>Сделок: <b>${Number(item.carsCount || 0)}</b></p>
            <p>Начислено: <b>${Number(item.investorPayout || 0).toLocaleString("ru-RU")} ₽</b></p>
            <p>Выплачено: <b>${Number(item.paid || 0).toLocaleString("ru-RU")} ₽</b></p>
            <p>Ожидает: <b>${Number(item.due || 0).toLocaleString("ru-RU")} ₽</b></p>
            <p>Вклад в прибыль владельца: <b>${Number(item.ownerProfit || 0).toLocaleString("ru-RU")} ₽</b></p>
        </div>
    `).join("");
}

function escapeFinanceHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
