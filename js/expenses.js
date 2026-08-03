// AutoFlip CRM 2.0
// Расходы автомобиля

function addExpenseForm(carId) {
    const car = getCarById(carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const categories = typeof getExpenseCategories === "function"
        ? getExpenseCategories()
        : ["Ремонт", "Запчасти", "Мойка", "Документы", "Страховка", "Другое"];

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>💸 Новый расход</h2>

            <div class="label">Сумма</div>
            <input
                id="expenseAmount"
                class="input"
                type="number"
                min="1"
                placeholder="50000"
            >

            <div class="label">Статья расхода</div>
            <select id="expenseCategory" class="input">
                ${categories.map(category => `
                    <option value="${escapeExpenseHtml(category)}">${escapeExpenseHtml(category)}</option>
                `).join("")}
            </select>

            <div class="label">Комментарий</div>
            <input
                id="expenseComment"
                class="input"
                type="text"
                placeholder="Комментарий"
            >

            <div class="button" onclick="saveExpense(${carId})">
                Сохранить расход
            </div>

            <div class="button" onclick="openCarCard(${carId})">
                ← Назад
            </div>
        </div>
    `;
}

function saveExpense(carId) {
    const cars = getCars();
    const car = cars.find(item => item.id == carId);

    if (!car) {
        alert("Автомобиль не найден");
        return;
    }

    const amount = Number(document.getElementById("expenseAmount").value || 0);
    const category = document.getElementById("expenseCategory").value.trim();
    const comment = document.getElementById("expenseComment").value.trim();

    if (!amount || amount <= 0) {
        alert("Введите сумму расхода");
        return;
    }

    if (!category) {
        alert("Выберите статью расхода");
        return;
    }

    if (!Array.isArray(car.expensesList)) {
        car.expensesList = [];
    }

    const expense = {
        id: Date.now(),
        category,
        amount,
        comment,
        date: new Date().toLocaleDateString("ru-RU")
    };

    car.expensesList.push(expense);
    car.expenses = car.expensesList.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    if (!Array.isArray(car.history)) {
        car.history = [];
    }

    car.history.push({
        date: new Date().toLocaleDateString("ru-RU"),
        action: `Добавлен расход: ${expense.category} ${expense.amount.toLocaleString("ru-RU")} ₽`
    });

    saveCars(cars);

    alert("Расход добавлен");
    openCarCard(carId);
}

function escapeExpenseHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
