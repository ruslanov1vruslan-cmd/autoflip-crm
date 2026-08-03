// AutoFlip CRM 2.0
// Карточка автомобиля


function openCarCard(id){


const cars = getCars();


const car = cars.find(item => item.id === id);



if(!car){

alert("Автомобиль не найден");

return;

}



const expenses = Number(car.expenses || 0);

const buy = Number(car.buyPrice || 0);

const sale = Number(car.salePrice || 0);


let profit = 0;


if(sale > 0){

profit = sale - buy - expenses;

}



document.getElementById("app").innerHTML = `


<div class="card">


<h2>

${car.brand} ${car.model}

</h2>



<span class="status ${getStatusClass(car.status)}">

${getStatusIcon(car.status)}
${car.status}

</span>


<br><br>


<div class="card">


<div class="label">

Автомобиль

</div>


<p>

Год: ${car.year}

</p>


<p>

Пробег: ${car.mileage} км

</p>


<p>

VIN: ${car.vin || "-"}

</p>


<p>

Госномер: ${car.number || "-"}

</p>



</div>





<div class="card">


<h3>

💰 Деньги

</h3>



<p>

Покупка:

<b>

${buy.toLocaleString()} ₽

</b>

</p>



<p>

Расходы:

<b>

${expenses.toLocaleString()} ₽

</b>

</p>



<p>

Себестоимость:

<b>

${(buy + expenses).toLocaleString()} ₽

</b>

</p>



<p>

Продажа:

<b>

${sale.toLocaleString()} ₽

</b>

</p>



<p class="profit">

Прибыль:

${profit.toLocaleString()} ₽

</p>
<div class="button" onclick="openPreparation(${car.id})">

🔧 Подготовка

</div>


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
<div class="button" onclick="showCars()">

← Назад к автомобилям

</div>



`;



}
