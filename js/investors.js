// AutoFlip CRM 2.0
// Инвесторы и выплаты


function showInvestorPayment(carId){


const cars = getCars();


const car = cars.find(
item => item.id === carId
);



if(!car){

alert("Автомобиль не найден");

return;

}



document.getElementById("app").innerHTML = `


<div class="card">


<h2>
👤 Инвестор
</h2>



<p>

Автомобиль:

<b>
${car.brand} ${car.model}
</b>

</p>



<p>

Прибыль сделки:

<b>
${car.profit?.toLocaleString() || 0} ₽
</b>

</p>



<p>

К выплате инвестору:

<b>
${car.investorProfit?.toLocaleString() || 0} ₽
</b>

</p>



<p>

Статус:

<span class="status prepare">

⏳ Ожидает выплаты

</span>

</p>



<div class="button"
onclick="confirmInvestorPayment(${car.id})">

💰 Выплатить инвестору

</div>



</div>


`;



}





function confirmInvestorPayment(carId){


const cars = getCars();


const car = cars.find(
item => item.id === carId
);



car.investorPaid = true;


car.investorPaymentDate =
new Date().toLocaleDateString();



if(!car.history){

car.history=[];

}



car.history.push({

date:
new Date().toLocaleDateString(),


action:
"Инвестору выплачена прибыль"

});



saveCars(cars);



alert(
"Выплата инвестору отмечена"
);



openCarCard(carId);


}
