// AutoFlip CRM 2.0
// Инвесторы

function showInvestorPayment(carId) {
    const car = getCarById(carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    if (!car.investor) {
        car.investor = {
            name: "",
            amount: 0,
            percent: 30,
            paymentStatus: "Ожидает",
            paymentDate: ""
        };
    }

    const investor = car.investor;
    const profit = Number(car.profit || 0);
    const investorProfit = profit > 0 ? profit * Number(investor.percent || 0) / 100 : 0;

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>👤 Инвестор</h2>

            <div class="label">Автомобиль</div>
            <p><b>${car.brand || ""} ${car.model || ""}</b></p>

            <div class="label">Имя инвестора</div>
            <input
                id="investorName"
                class="input"
                type="text"
                value="${escapeHtml(investor.name || "")}"
                placeholder="Иван"
            >

            <div class="label">Сумма вложения</div>
            <input
                id="investorAmount"
                class="input"
                type="number"
                min="0"
                value="${Number(investor.amount || 0)}"
                placeholder="1000000"
            >

            <div class="label">Доля инвестора (%)</div>
            <input
                id="investorPercent"
                class="input"
                type="number"
                min="0"
                max="100"
                value="${Number(investor.percent || 30)}"
                placeholder="30"
            >

            <div class="card">
                <h3>📊 Расчёт</h3>
                <p>Прибыль автомобиля: <b>${profit.toLocaleString("ru-RU")} ₽</b></p>
                <p>К выплате инвестору: <b class="profit">${investorProfit.toLocaleString("ru-RU")} ₽</b></p>
            </div>

            <div class="label">Статус выплаты</div>
            <select id="investorStatus" class="input">
                <option value="Ожидает" ${investor.paymentStatus === "Ожидает" ? "selected" : ""}>Ожидает</option>
                <option value="Выплачен" ${investor.paymentStatus === "Выплачен" ? "selected" : ""}>Выплачен</option>
            </select>

            <div class="button" onclick="saveInvestorPayment(${car.id})">
                💾 Сохранить
            </div>

            <div class="button" onclick="openCarCard(${car.id})">
                ← Назад
            </div>
        </div>
    `;
}

function saveInvestorPayment(carId) {
    const car = getCarById(carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const name = document.getElementById("investorName").value.trim();
    const amount = Number(document.getElementById("investorAmount").value || 0);
    const percent = Number(document.getElementById("investorPercent").value || 0);
    const paymentStatus = document.getElementById("investorStatus").value;

    car.investor = {
        name,
        amount,
        percent,
        paymentStatus,
        paymentDate: paymentStatus === "Выплачен" ? new Date().toLocaleDateString("ru-RU") : ""
    };

    if (!Array.isArray(car.history)) {
        car.history = [];
    }

    car.history.push({
        date: new Date().toLocaleDateString("ru-RU"),
        action: `Инвестор: ${name || "—"}, доля: ${percent}%, статус выплаты: ${paymentStatus}`
    });

    saveCars(getCars());

    alert("Инвестор сохранён");
    openCarCard(carId);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
