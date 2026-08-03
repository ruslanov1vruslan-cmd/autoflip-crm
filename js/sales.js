// AutoFlip CRM 2.0
// Продажа автомобиля

function sellCarForm(carId) {
    const car = getCarById(carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const currentSalePrice = Number(car.salePrice || 0);
    const investorName = car.investor?.name || "";
    const investorPercent = Number(car.investor?.percent || 30);
    const investorStatus = car.investor?.paymentStatus || "Ожидает";

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>💰 Продажа автомобиля</h2>

            <div class="label">Автомобиль</div>
            <p><b>${car.brand || ""} ${car.model || ""}</b></p>

            <div class="label">Цена продажи</div>
            <input
                id="salePrice"
                class="input"
                type="number"
                min="1"
                value="${currentSalePrice > 0 ? currentSalePrice : ""}"
                placeholder="3500000"
            >

            <div class="label">Имя инвестора</div>
            <input
                id="saleInvestorName"
                class="input"
                type="text"
                value="${escapeHtml(investorName)}"
                placeholder="Иван"
            >

            <div class="label">Доля инвестора (%)</div>
            <input
                id="saleInvestorPercent"
                class="input"
                type="number"
                min="0"
                max="100"
                value="${investorPercent}"
                placeholder="30"
            >

            <div class="label">Статус выплаты инвестору</div>
            <select id="saleInvestorStatus" class="input">
                <option value="Ожидает" ${investorStatus === "Ожидает" ? "selected" : ""}>Ожидает</option>
                <option value="Выплачен" ${investorStatus === "Выплачен" ? "selected" : ""}>Выплачен</option>
            </select>

            <div class="button" onclick="saveSale(${car.id})">
                Завершить продажу
            </div>

            <div class="button" onclick="openCarCard(${car.id})">
                ← Назад
            </div>
        </div>
    `;
}

function saveSale(carId) {
    const cars = getCars();
    const car = cars.find(item => item.id == carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const salePrice = Number(document.getElementById("salePrice").value || 0);
    const investorName = document.getElementById("saleInvestorName").value.trim();
    const investorPercent = Number(document.getElementById("saleInvestorPercent").value || 0);
    const investorStatus = document.getElementById("saleInvestorStatus").value;

    if (!salePrice || salePrice <= 0) {
        alert("Введите цену продажи");
        return;
    }

    const buy = Number(car.buyPrice || 0);
    const expenses = Number(car.expenses || 0);
    const profit = salePrice - buy - expenses;
    const investorProfit = investorPercent > 0 ? profit * investorPercent / 100 : 0;

    car.salePrice = salePrice;
    car.profit = profit;
    car.status = "Продано";
    car.saleDate = new Date().toLocaleDateString("ru-RU");

    car.investor = {
        name: investorName,
        percent: investorPercent,
        paymentStatus: investorStatus,
        paymentDate: investorStatus === "Выплачен" ? new Date().toLocaleDateString("ru-RU") : ""
    };

    if (!Array.isArray(car.history)) {
        car.history = [];
    }

    car.history.push({
        date: new Date().toLocaleDateString("ru-RU"),
        action: `Автомобиль продан за ${salePrice.toLocaleString("ru-RU")} ₽. Прибыль: ${profit.toLocaleString("ru-RU")} ₽`
    });

    if (investorName) {
        car.history.push({
            date: new Date().toLocaleDateString("ru-RU"),
            action: `Инвестор: ${investorName}, доля: ${investorPercent}%, к выплате: ${investorProfit.toLocaleString("ru-RU")} ₽, статус: ${investorStatus}`
        });
    }

    saveCars(cars);

    alert("Продажа завершена");
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
