// AutoFlip CRM 2.0
// Инвесторы

function showInvestorPayment(carId) {
    const car = getCarById(carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const savedInvestors = typeof getInvestorList === "function" ? getInvestorList() : [];
    const currentInvestor = car.investor || {
        name: "",
        amount: 0,
        percent: 30,
        paymentStatus: "Ожидает",
        paymentDate: ""
    };

    const profit = Number(car.profit || 0);
    const investorProfit = profit > 0 ? profit * Number(currentInvestor.percent || 0) / 100 : 0;

    const investorOptions = savedInvestors.length
        ? savedInvestors.map(investor => `
            <option value="${escapeInvestorHtml(investor.name)}" data-percent="${Number(investor.percent || 30)}">
                ${escapeInvestorHtml(investor.name)} (${Number(investor.percent || 30)}%)
            </option>
        `).join("")
        : `<option value="">Инвесторы не добавлены</option>`;

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>👤 Инвестор</h2>

            <div class="label">Быстрый выбор</div>
            <select id="investorQuickSelect" class="input" onchange="applySelectedInvestor()">
                <option value="">Выберите инвестора</option>
                ${investorOptions}
            </select>

            <div class="label">Автомобиль</div>
            <p><b>${car.brand || ""} ${car.model || ""}</b></p>

            <div class="label">Имя инвестора</div>
            <input
                id="investorName"
                class="input"
                type="text"
                value="${escapeInvestorHtml(currentInvestor.name || "")}"
                placeholder="Иван"
            >

            <div class="label">Сумма вложения</div>
            <input
                id="investorAmount"
                class="input"
                type="number"
                min="0"
                value="${Number(currentInvestor.amount || 0)}"
                placeholder="1000000"
            >

            <div class="label">Доля инвестора (%)</div>
            <input
                id="investorPercent"
                class="input"
                type="number"
                min="0"
                max="100"
                value="${Number(currentInvestor.percent || 30)}"
                placeholder="30"
            >

            <div class="card">
                <h3>📊 Расчёт</h3>
                <p>Прибыль автомобиля: <b>${profit.toLocaleString("ru-RU")} ₽</b></p>
                <p>К выплате инвестору: <b class="profit">${investorProfit.toLocaleString("ru-RU")} ₽</b></p>
            </div>

            <div class="label">Статус выплаты</div>
            <select id="investorStatus" class="input">
                <option value="Ожидает" ${currentInvestor.paymentStatus === "Ожидает" ? "selected" : ""}>Ожидает</option>
                <option value="Выплачен" ${currentInvestor.paymentStatus === "Выплачен" ? "selected" : ""}>Выплачен</option>
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

function applySelectedInvestor() {
    const select = document.getElementById("investorQuickSelect");
    if (!select) return;

    const selectedName = select.value;
    if (!selectedName) return;

    const options = Array.from(select.options);
    const selectedOption = options.find(option => option.value === selectedName);

    if (!selectedOption) return;

    const percent = Number(selectedOption.dataset.percent || 30);

    const nameInput = document.getElementById("investorName");
    const percentInput = document.getElementById("investorPercent");

    if (nameInput) {
        nameInput.value = selectedName;
    }

    if (percentInput) {
        percentInput.value = percent;
    }
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

function escapeInvestorHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
