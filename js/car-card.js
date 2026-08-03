// AutoFlip CRM 2.0
// Карточка автомобиля


function openCarCard(id) {
    const car = getCarById(id);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const buy = Number(car.buyPrice || 0);
    const expenses = Number(car.expenses || 0);
    const sale = Number(car.salePrice || 0);

    let profit = Number(car.profit || 0);
    if (!profit && sale > 0) {
        profit = sale - buy - expenses;
    }

    const investorName = car.investor?.name || "—";
    const investorPercent = Number(car.investor?.percent || 0);
    const investorStatus = car.investor?.paymentStatus || "Ожидает";
    const investorProfit = profit > 0 ? (profit * investorPercent / 100) : 0;

    let historyHtml = "";
    if (Array.isArray(car.history) && car.history.length > 0) {
        historyHtml = car.history
            .slice()
            .reverse()
            .map(item => `
                <div class="card">
                    <b>${item.date || ""}</b>
                    <br><br>
                    ${item.action || ""}
                </div>
            `)
            .join("");
    } else {
        historyHtml = `
            <div class="card">
                <div class="label">История</div>
                <p>Пока нет событий</p>
            </div>
        `;
    }

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>${car.brand || ""} ${car.model || ""}</h2>

            <span class="status ${getStatusClass(car.status)}">
                ${getStatusIcon(car.status)}
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

            <p>Покупка: <b>${buy.toLocaleString()} ₽</b></p>
            <p>Расходы: <b>${expenses.toLocaleString()} ₽</b></p>
            <p>Себестоимость: <b>${(buy + expenses).toLocaleString()} ₽</b></p>
            <p>Продажа: <b>${sale.toLocaleString()} ₽</b></p>
            <p class="profit">Прибыль: ${profit.toLocaleString()} ₽</p>
        </div>

        <div class="card">
            <h3>👤 Инвестор</h3>
            <p>Имя: <b>${investorName}</b></p>
            <p>Доля: <b>${investorPercent}%</b></p>
            <p>К выплате: <b>${investorProfit.toLocaleString()} ₽</b></p>
            <p>Статус выплаты: <b>${investorStatus}</b></p>
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

        <div class="card">
            <h3>📜 История</h3>
            ${historyHtml}
        </div>

        <div class="button" onclick="showCars()">
            ← Назад к автомобилям
        </div>
    `;
}
