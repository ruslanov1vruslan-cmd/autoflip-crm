// AutoFlip CRM 2.0
// Настройки приложения

const SETTINGS_KEY = "autoflip_settings";

function getDefaultExpenseCategories() {
    return [
        "Ремонт",
        "Запчасти",
        "Мойка",
        "Документы",
        "Страховка",
        "Другое"
    ];
}

function normalizeExpenseCategories(categories) {
    const list = Array.isArray(categories) ? categories : [];
    const cleaned = list
        .map(item => String(item || "").trim())
        .filter(Boolean);

    const unique = [];
    cleaned.forEach(item => {
        if (!unique.includes(item)) {
            unique.push(item);
        }
    });

    return unique.length > 0 ? unique : getDefaultExpenseCategories();
}

function normalizeInvestors(investors) {
    const list = Array.isArray(investors) ? investors : [];
    const cleaned = list
        .map(item => ({
            name: String(item?.name || "").trim(),
            percent: Number(item?.percent || 30)
        }))
        .filter(item => item.name);

    const unique = [];
    cleaned.forEach(item => {
        if (!unique.some(existing => existing.name.toLowerCase() === item.name.toLowerCase())) {
            unique.push(item);
        }
    });

    return unique;
}

function getDefaultSettings() {
    return {
        companyName: "AutoFlip CRM",
        ownerName: "",
        currency: "₽",
        investorDefaultPercent: 30,
        expenseCategories: getDefaultExpenseCategories(),
        investors: []
    };
}

function getSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);

    const defaults = getDefaultSettings();

    if (!raw) {
        return defaults;
    }

    try {
        const parsed = JSON.parse(raw);

        return {
            ...defaults,
            ...parsed,
            expenseCategories: normalizeExpenseCategories(parsed.expenseCategories),
            investors: normalizeInvestors(parsed.investors)
        };
    } catch (error) {
        console.error("Ошибка чтения настроек:", error);
        return defaults;
    }
}

function saveSettings(settings) {
    const current = getSettings();

    const normalized = {
        ...current,
        ...settings,
        expenseCategories: normalizeExpenseCategories(settings.expenseCategories ?? current.expenseCategories),
        investors: normalizeInvestors(settings.investors ?? current.investors)
    };

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(normalized));
}

function getExpenseCategories() {
    return normalizeExpenseCategories(getSettings().expenseCategories);
}

function getInvestorList() {
    return normalizeInvestors(getSettings().investors);
}

function showSettings() {
    const settings = getSettings();
    const categories = getExpenseCategories();
    const investors = getInvestorList();

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>⚙️ Настройки</h2>
            <div class="label">Основные параметры приложения</div>
        </div>

        <div class="card">
            <div class="label">Название компании</div>
            <input id="settingCompanyName" class="input" value="${escapeSettingsHtml(settings.companyName || "")}" placeholder="AutoFlip CRM">

            <div class="label">Имя владельца</div>
            <input id="settingOwnerName" class="input" value="${escapeSettingsHtml(settings.ownerName || "")}" placeholder="Руслан">

            <div class="label">Валюта</div>
            <input id="settingCurrency" class="input" value="${escapeSettingsHtml(settings.currency || "₽")}" placeholder="₽">

            <div class="label">Процент инвестора по умолчанию</div>
            <input id="settingInvestorPercent" class="input" type="number" min="0" max="100" value="${Number(settings.investorDefaultPercent || 30)}" placeholder="30">

            <div class="button" onclick="saveAppSettings()">
                💾 Сохранить настройки
            </div>
        </div>

        <div class="card">
            <h3>💸 Статьи расходов</h3>
            <div class="label">Быстрый выбор в расходах</div>

            <div id="expenseCategoriesList">
                ${renderExpenseCategories(categories)}
            </div>

            <div class="label" style="margin-top:16px;">Добавить новую статью</div>
            <input id="newExpenseCategory" class="input" type="text" placeholder="Например: Шиномонтаж">

            <div class="button" onclick="addExpenseCategory()">
                ➕ Добавить статью
            </div>

            <div class="button" onclick="saveExpenseCategories()">
                💾 Сохранить список статей
            </div>
        </div>

        <div class="card">
            <h3>👤 Инвесторы</h3>
            <div class="label">Быстрый выбор в карточке инвестора</div>

            <div id="investorsList">
                ${renderInvestors(investors)}
            </div>

            <div class="label" style="margin-top:16px;">Добавить нового инвестора</div>
            <input id="newInvestorName" class="input" type="text" placeholder="Иван">
            <input id="newInvestorPercent" class="input" type="number" min="0" max="100" placeholder="30">

            <div class="button" onclick="addInvestor()">
                ➕ Добавить инвестора
            </div>

            <div class="button" onclick="saveInvestors()">
                💾 Сохранить список инвесторов
            </div>
        </div>

        <div class="card">
            <h3>📦 Резервная копия</h3>

            <div class="button" onclick="exportBackup()">
                ⬇️ Скачать резервную копию
            </div>

            <div class="label" style="margin-top:16px;">Импорт данных</div>
            <textarea id="importData" class="input" rows="6" placeholder='Вставь сюда JSON-резервную копию'></textarea>

            <div class="button" onclick="importBackup()">
                ⬆️ Импортировать данные
            </div>
        </div>

        <div class="card">
            <h3>🧹 Данные</h3>

            <div class="button" onclick="clearAllData()">
                Удалить все данные
            </div>

            <div class="label" style="margin-top:12px;">
                Осторожно: это удалит автомобили, расходы, продажи, инвесторов и историю.
            </div>
        </div>

        <div class="button" onclick="goBack()">
            ← Назад
        </div>
    `;
}

function renderExpenseCategories(categories) {
    if (!categories.length) {
        return `<p>Список статей пуст</p>`;
    }

    return categories
        .map((category, index) => `
            <div class="card" style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; margin-bottom:10px;">
                <div>${escapeSettingsHtml(category)}</div>
                <button type="button" onclick="removeExpenseCategory(${index})" style="border:none; background:#f3f4f6; border-radius:12px; padding:8px 12px; cursor:pointer;">
                    Удалить
                </button>
            </div>
        `)
        .join("");
}

function renderInvestors(investors) {
    if (!investors.length) {
        return `<p>Список инвесторов пуст</p>`;
    }

    return investors
        .map((investor, index) => `
            <div class="card" style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; margin-bottom:10px;">
                <div>
                    <div><b>${escapeSettingsHtml(investor.name)}</b></div>
                    <div class="label">${Number(investor.percent || 0)}%</div>
                </div>
                <button type="button" onclick="removeInvestor(${index})" style="border:none; background:#f3f4f6; border-radius:12px; padding:8px 12px; cursor:pointer;">
                    Удалить
                </button>
            </div>
        `)
        .join("");
}

function addExpenseCategory() {
    const input = document.getElementById("newExpenseCategory");
    const value = String(input.value || "").trim();

    if (!value) {
        alert("Введите название статьи");
        return;
    }

    const settings = getSettings();
    const categories = getExpenseCategories();

    if (categories.includes(value)) {
        alert("Такая статья уже есть");
        return;
    }

    categories.push(value);
    settings.expenseCategories = categories;
    saveSettings(settings);

    input.value = "";
    showSettings();
}

function removeExpenseCategory(index) {
    const settings = getSettings();
    const categories = getExpenseCategories();

    if (categories.length <= 1) {
        alert("Должна остаться хотя бы одна статья");
        return;
    }

    categories.splice(index, 1);
    settings.expenseCategories = categories;
    saveSettings(settings);

    showSettings();
}

function saveExpenseCategories() {
    const settings = getSettings();
    settings.expenseCategories = getExpenseCategories();
    saveSettings(settings);
    alert("Статьи расходов сохранены");
    showSettings();
}

function addInvestor() {
    const name = String(document.getElementById("newInvestorName").value || "").trim();
    const percent = Number(document.getElementById("newInvestorPercent").value || getSettings().investorDefaultPercent || 30);

    if (!name) {
        alert("Введите имя инвестора");
        return;
    }

    const settings = getSettings();
    const investors = getInvestorList();

    if (investors.some(item => item.name.toLowerCase() === name.toLowerCase())) {
        alert("Такой инвестор уже есть");
        return;
    }

    investors.push({
        name,
        percent
    });

    settings.investors = investors;
    saveSettings(settings);

    document.getElementById("newInvestorName").value = "";
    document.getElementById("newInvestorPercent").value = "";

    showSettings();
}

function removeInvestor(index) {
    const settings = getSettings();
    const investors = getInvestorList();

    if (investors.length === 0) {
        return;
    }

    investors.splice(index, 1);
    settings.investors = investors;
    saveSettings(settings);

    showSettings();
}

function saveInvestors() {
    const settings = getSettings();
    settings.investors = getInvestorList();
    saveSettings(settings);
    alert("Список инвесторов сохранён");
    showSettings();
}

function saveAppSettings() {
    const settings = {
        companyName: document.getElementById("settingCompanyName").value.trim() || "AutoFlip CRM",
        ownerName: document.getElementById("settingOwnerName").value.trim() || "",
        currency: document.getElementById("settingCurrency").value.trim() || "₽",
        investorDefaultPercent: Number(document.getElementById("settingInvestorPercent").value || 30),
        expenseCategories: getExpenseCategories(),
        investors: getInvestorList()
    };

    saveSettings(settings);
    alert("Настройки сохранены");
    showSettings();
}

function exportBackup() {
    const payload = {
        settings: getSettings(),
        cars: getCars()
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `autoflip-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

function importBackup() {
    const raw = document.getElementById("importData").value.trim();

    if (!raw) {
        alert("Вставь JSON-файл");
        return;
    }

    try {
        const data = JSON.parse(raw);

        if (data.settings) {
            saveSettings(data.settings);
        }

        if (Array.isArray(data.cars)) {
            saveCars(data.cars);
        }

        alert("Данные импортированы");
        loadHome();
    } catch (error) {
        alert("Не удалось импортировать данные");
        console.error(error);
    }
}

function clearAllData() {
    const ok = confirm("Удалить все данные приложения?");
    if (!ok) return;

    localStorage.removeItem("autoflip_cars");
    localStorage.removeItem(SETTINGS_KEY);

    alert("Все данные удалены");
    loadHome();
}

function escapeSettingsHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
