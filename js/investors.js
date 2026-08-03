// AutoFlip CRM 2.0
// Инвесторы


function showInvestorPayment(carId){


const cars = getCars();


const car = cars.find(
item => item.id == carId
);



if(!car){

alert("Автомобиль не найден");

return;

}



const profit = Number(car.profit || 0);



document.getElementById("app").innerHTML = `



<div class="card">


<h2>
👤 Выплата инвестору
</h2>



<p>

Автомобиль:

<b>

${car.brand} ${car.model}

</b>

</p>




<p>

Прибыль:

<b class="profit">

${profit.toLocaleString()} ₽

</b>

</p>




<select id="investorStatus" class="input">


<option value="Ожидает">

Ожидает

</option>



<option value="Выплачен">

Выплачен

</option>



</select>




<div class="button"

onclick="saveInvestorPayment(${car.id})">

💰 Сохранить выплату

</div>




<div class="button"

onclick="openCarCard(${car.id})">

← Назад

</div>



</div>



`;



}





function saveInvestorPayment(carId){


const cars = getCars();



const car = cars.find(
item => item.id == carId
);



if(!car){

alert("Автомобиль не найден");

return;

}



const status =
document.getElementById("investorStatus").value;



if(!car.investor){

car.investor = {};

}



car.investor.paymentStatus = status;



if(!car.history){

car.history = [];

}



car.history.push({

date:
new Date().toLocaleDateString(),


action:
`Выплата инвестору: ${status}`

});





saveCars(cars);



alert("Статус выплаты сохранён");



openCarCard(carId);



}
