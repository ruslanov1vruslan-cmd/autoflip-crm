// AutoFlip CRM 2.0
// Продажа автомобиля

function sellCarForm(carId) {
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

    const investorOptions = savedInvestors.length
        ? savedInvestors.map(investor => `
            <option value="${escapeSaleHtml(investor.name)}" data-percent="${Number(investor.percent || 30)}">
                ${escapeSaleHtml(investor.name)} (${Number(investor.percent || 30)}%)
            </option>
        `).join("")
        : `<option value="">Инвесторы не добавлены</option>`;

    const selectedInvestorName = currentInvestor.name || "";

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>💰 Продажа автомобиля</h2>

            <div class="label">Автомобиль</div>
            <p><b>${car.brand || ""} ${car.model || ""}</b></p>

            <div class="label">Быстрый выбор инвестора</div>
            <select id="saleInvestorQuickSelect" class="input" onchange="applySelectedSaleInvestor()">
                <option value="">Выберите инвестора</option>
                ${investorOptions}
            </select>

            <div class="label">Цена продажи</div>
            <input
                id="salePrice"
                class="input"
                type="number"
                min="1"
                value="${Number(car.salePrice || 0) > 0 ? Number(car.salePrice || 0) : ""}"
                placeholder="3500000"
            >

            <div class="label">Имя инвестора</div>
            <input
                id="saleInvestorName"
                class="input"
                type="text"
                value="${escapeSaleHtml(selectedInvestorName)}"
                placeholder="Иван"
            >

            <div class="label">Сумма вложения инвестора</div>
            <input
                id="saleInvestorAmount"
                class="input"
                type="number"
                min="0"
                value="${Number(currentInvestor.amount || 0)}"
                placeholder="1000000"
            >

            <div class="label">Доля инвестора (%)</div>
            <input
                id="saleInvestorPercent"
                class="input"
                type="number"
                min="0"
                max="100"
                value="${Number(currentInvestor.percent || 30)}"
                placeholder="30"
            >

            <div class="label">Статус выплаты инвестору</div>
            <select id="saleInvestorStatus" class="input">
                <option value="Ожидает" ${currentInvestor.paymentStatus === "Ожидает" ? "selected" : ""}>Ожидает</option>
                <option value="Выплачен" ${currentInvestor.paymentStatus === "Выплачен" ? "selected" : ""}>Выплачен</option>
            </select>

            <div class="button" onclick="saveSale(${car.id})">
                Завершить продажу
            </div>

            <div class="button" onclick="openCarCard(${car.id})">
                ← Назад
            </div>
        </div>
    `;

    // Если инвестор уже был выбран в карточке и есть в списке настроек — подсветим его в быстром выборе
    if (selectedInvestorName) {
        const quickSelect = document.getElementById("saleInvestorQuickSelect");
        if (quickSelect) {
            quickSelect.value = selectedInvestorName;
        }
    }
}

function applySelectedSaleInvestor() {
    const select = document.getElementById("saleInvestorQuickSelect");
    if (!select) return;

    const selectedName = select.value;
    if (!selectedName) return;

    const selectedOption = Array.from(select.options).find(option => option.value === selectedName);
    if (!selectedOption) return;

    const percent = Number(selectedOption.dataset.percent || 30);

    const nameInput = document.getElementById("saleInvestorName");
    const percentInput = document.getElementById("saleInvestorPercent");

    if (nameInput) {
        nameInput.value = selectedName;
    }

    if (percentInput) {
        percentInput.value = percent;
    }
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
    const investorAmount = Number(document.getElementById("saleInvestorAmount").value || 0);
    const investorPercent = Number(document.getElementById("saleInvestorPercent").value || 0);
    const investorStatus = document.getElementById("saleInvestorStatus").value;

    if (!salePrice || salePrice <= 0) {
        alert("Введите цену продажи");
        return;
    }

    const buy = Number(car.buyPrice || 0);
    const expenses = Number(car.expenses || 0);
    const grossProfit = salePrice - buy - expenses;
    const investorPayout = investorPercent > 0 ? grossProfit * investorPercent / 100 : 0;
    const ownerProfit = grossProfit - investorPayout;

    car.salePrice = salePrice;
    car.profit = ownerProfit;
    car.status = "Продано";
    car.saleDate = new Date().toLocaleDateString("ru-RU");

    car.investor = {
        name: investorName,
        amount: investorAmount,
        percent: investorPercent,
        paymentStatus: investorStatus,
        paymentDate: investorStatus === "Выплачен" ? new Date().toLocaleDateString("ru-RU") : ""
    };

    if (!Array.isArray(car.history)) {
        car.history = [];
    }

    car.history.push({
        date: new Date().toLocaleDateString("ru-RU"),
        action: `Автомобиль продан за ${salePrice.toLocaleString("ru-RU")} ₽. Валовая прибыль: ${grossProfit.toLocaleString("ru-RU")} ₽`
    });

    if (investorName) {
        car.history.push({
            date: new Date().toLocaleDateString("ru-RU"),
            action: `Инвестор: ${investorName}, доля: ${investorPercent}%, к выплате: ${investorPayout.toLocaleString("ru-RU")} ₽, статус: ${investorStatus}`
        });
    }

    saveCars(cars);

    alert("Продажа завершена");
    openCarCard(carId);
}

function escapeSaleHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
