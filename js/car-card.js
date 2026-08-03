// AutoFlip CRM 2.0
// Карточка автомобиля


function openCarCard(id){


const car = getCarById(id);



if(!car){

alert("Автомобиль не найден");

return;

}



const buy = Number(car.buyPrice || 0);

const expenses = Number(car.expenses || 0);

const sale = Number(car.salePrice || 0);


let profit = Number(car.profit || 0);


if(!profit && sale > 0){

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



</div>





<div class="card">


<h3>

🚗 Автомобиль

</h3>


<p>
Год: ${car.year || "-"}
</p>


<p>
Пробег: ${car.mileage || 0} км
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



</div>





<div class="button" onclick="openPreparation(${car.id})">

🔧 Подготовка

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




<div class="button" onclick="deleteCarConfirm(${car.id})">

🗑 Удалить автомобиль

</div>




<div class="button" onclick="showCars()">

← Назад

</div>



`;



}


`;



}
