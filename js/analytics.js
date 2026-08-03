// AutoFlip CRM 2.0
// Единая аналитика и расчёты

function getCarEconomics(car) {
    const buy = Number(car && car.buyPrice ? car.buyPrice : 0);
    const expenses = Number(car && car.expenses ? car.expenses : 0);
    const sale = Number(car && car.salePrice ? car.salePrice : 0);
    const sold = String(car && car.status ? car.status : "") === "Продано";

    const grossProfit = sold && sale > 0 ? sale - buy - expenses : 0;

    const investorPercent = Number(
        car && car.investor && car.investor.percent ? car.investor.percent : 0
    );

    const investorPayout = sold && grossProfit > 0
        ? Math.max(0, grossProfit * investorPercent / 100)
        : 0;

    const ownerProfit = sold
        ? grossProfit - investorPayout
        : 0;

    return {
        buy,
        expenses,
        sale,
        grossProfit,
        investorPercent,
        investorPayout,
        ownerProfit
    };
}

function getAnalytics() {
    const cars = getCars();

    let moneyInCars = 0;
    let totalBuy = 0;
    let totalExpenses = 0;
    let totalSales = 0;
    let grossProfit = 0;
    let investorPayout = 0;
    let ownerProfit = 0;
    let activeCars = 0;
    let soldCars = 0;

    cars.forEach(car => {
        const econ = getCarEconomics(car);

        totalBuy += econ.buy;
        totalExpenses += econ.expenses;

        if (String(car.status || "") === "Продано") {
            soldCars++;
            totalSales += econ.sale;
            grossProfit += econ.grossProfit;
            investorPayout += econ.investorPayout;
            ownerProfit += econ.ownerProfit;
        } else {
            activeCars++;
            moneyInCars += econ.buy + econ.expenses;
        }
    });

    return {
        carsCount: cars.length,
        activeCars,
        soldCars,
        moneyInCars,
        totalBuy,
        totalExpenses,
        totalSales,
        grossProfit,
        investorPayout,
        ownerProfit,
        totalProfit: ownerProfit
    };
}

function getFinanceReport(year, month) {
    const cars = getCars();
    const current = getAnalytics();

    const report = {
        carsCount: cars.length,
        activeCars: 0,
        soldCars: 0,
        moneyInCars: current.moneyInCars,

        purchasesCount: 0,
        expensesCount: 0,
        soldCount: 0,

        totalBuy: 0,
        totalExpenses: 0,
        totalSales: 0,
        grossProfit: 0,
        investorPayout: 0,
        ownerProfit: 0,

        investorPaid: 0,
        investorDue: 0,
        investors: []
    };

    const investorMap = new Map();

    cars.forEach(car => {
        const econ = getCarEconomics(car);

        if (String(car.status || "") === "Продано") {
            report.soldCars++;
        } else {
            report.activeCars++;
        }

        const purchaseDate = getCarPurchaseDate(car);
        if (matchesFinancePeriod(purchaseDate, year, month)) {
            report.purchasesCount++;
            report.totalBuy += econ.buy;
        }

        if (Array.isArray(car.expensesList)) {
            car.expensesList.forEach(expense => {
                if (matchesFinancePeriod(expense.date, year, month)) {
                    report.expensesCount++;
                    report.totalExpenses += Number(expense.amount || 0);
                }
            });
        }

        const saleDate = getCarSaleDate(car);
        const soldNow = String(car.status || "") === "Продано" && econ.sale > 0;
        if (soldNow && matchesFinancePeriod(saleDate, year, month)) {
            report.soldCount++;
            report.totalSales += econ.sale;
            report.grossProfit += econ.grossProfit;
            report.investorPayout += econ.investorPayout;
            report.ownerProfit += econ.ownerProfit;

            const investorName = String(
                car && car.investor && car.investor.name ? car.investor.name : "Без имени"
            ).trim() || "Без имени";

            const investorStatus = String(
                car && car.investor && car.investor.paymentStatus
                    ? car.investor.paymentStatus
                    : "Ожидает"
            );

            const key = investorName.toLowerCase();
            let entry = investorMap.get(key);

            if (!entry) {
                entry = {
                    name: investorName,
                    carsCount: 0,
                    grossProfit: 0,
                    investorPayout: 0,
                    ownerProfit: 0,
                    paid: 0,
                    due: 0
                };
            }

            entry.carsCount += 1;
            entry.grossProfit += econ.grossProfit;
            entry.investorPayout += econ.investorPayout;
            entry.ownerProfit += econ.ownerProfit;

            if (investorStatus === "Выплачен") {
                entry.paid += econ.investorPayout;
                report.investorPaid += econ.investorPayout;
            } else {
                entry.due += econ.investorPayout;
                report.investorDue += econ.investorPayout;
            }

            investorMap.set(key, entry);
        }
    });

    report.investors = Array.from(investorMap.values()).sort((a, b) => {
        return b.investorPayout - a.investorPayout;
    });

    return report;
}

function getFinanceYears(cars) {
    const years = new Set();
    const currentYear = new Date().getFullYear();

    years.add(String(currentYear));

    cars.forEach(car => {
        const dates = [
            car.createdAt,
            car.saleDate,
            ...(Array.isArray(car.expensesList) ? car.expensesList.map(item => item.date) : []),
            ...(Array.isArray(car.history) ? car.history.map(item => item.date) : [])
        ];

        dates.forEach(date => {
            const parsed = parseRuDate(date);
            if (parsed) {
                years.add(String(parsed.getFullYear()));
            }
        });
    });

    return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

function getCarPurchaseDate(car) {
    if (car && car.createdAt) {
        return car.createdAt;
    }

    if (car && Array.isArray(car.history) && car.history.length > 0) {
        const createdEvent = car.history.find(item => String(item.action || "").toLowerCase().includes("создан"));
        if (createdEvent && createdEvent.date) {
            return createdEvent.date;
        }

        if (car.history[0] && car.history[0].date) {
            return car.history[0].date;
        }
    }

    return new Date().toLocaleDateString("ru-RU");
}

function getCarSaleDate(car) {
    if (car && car.saleDate) {
        return car.saleDate;
    }

    if (car && Array.isArray(car.history) && car.history.length > 0) {
        const soldEvent = [...car.history].reverse().find(item => String(item.action || "").toLowerCase().includes("продан"));
        if (soldEvent && soldEvent.date) {
            return soldEvent.date;
        }
    }

    return "";
}

function matchesFinancePeriod(dateValue, year, month) {
    const parsed = parseRuDate(dateValue);
    if (!parsed) return false;

    if (String(parsed.getFullYear()) !== String(year)) {
        return false;
    }

    if (month === "all") {
        return true;
    }

    return String(parsed.getMonth() + 1) === String(month);
}

function parseRuDate(value) {
    if (!value) return null;

    if (value instanceof Date && !isNaN(value.getTime())) {
        return value;
    }

    const str = String(value).trim();

    const ruMatch = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (ruMatch) {
        const day = Number(ruMatch[1]);
        const month = Number(ruMatch[2]) - 1;
        const year = Number(ruMatch[3]);
        const d = new Date(year, month, day);
        return isNaN(d.getTime()) ? null : d;
    }

    const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
        const year = Number(isoMatch[1]);
        const month = Number(isoMatch[2]) - 1;
        const day = Number(isoMatch[3]);
        const d = new Date(year, month, day);
        return isNaN(d.getTime()) ? null : d;
    }

    const fallback = new Date(str);
    return isNaN(fallback.getTime()) ? null : fallback;
}

function getMonthName(monthNumber) {
    switch (Number(monthNumber)) {
        case 1: return "Январь";
        case 2: return "Февраль";
        case 3: return "Март";
        case 4: return "Апрель";
        case 5: return "Май";
        case 6: return "Июнь";
        case 7: return "Июль";
        case 8: return "Август";
        case 9: return "Сентябрь";
        case 10: return "Октябрь";
        case 11: return "Ноябрь";
        case 12: return "Декабрь";
        default: return "Месяц";
    }
}
