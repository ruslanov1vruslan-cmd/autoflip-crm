// AutoFlip CRM 2.0
// Настройки приложения

const SETTINGS_KEY = "autoflip_settings";

function getSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);

    if (!raw) {
        return {
            companyName: "AutoFlip CRM",
            ownerName: "",
            currency: "₽",
            investorDefaultPercent: 30
        };
    }

    try {
        const parsed = JSON.parse(raw);

        return {
            companyName: "AutoFlip CRM",
            ownerName: "",
            currency: "₽",
            investorDefaultPercent: 30,
            ...parsed
        };
    } catch (error) {
        console.error("Ошибка чтения настроек:", error);

        return {
            companyName: "AutoFlip CRM",
            ownerName: "",
            currency: "₽",
            investorDefaultPercent: 30
        };
    }
}

function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function showSettings() {
    const settings = getSettings();

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

function saveAppSettings() {
    const settings = {
        companyName: document.getElementById("settingCompanyName").value.trim() || "AutoFlip CRM",
        ownerName: document.getElementById("settingOwnerName").value.trim() || "",
        currency: document.getElementById("settingCurrency").value.trim() || "₽",
        investorDefaultPercent: Number(document.getElementById("settingInvestorPercent").value || 30)
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
