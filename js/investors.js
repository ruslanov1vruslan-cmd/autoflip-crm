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



if(!car.investor){

car.investor = {

name:"",
amount:0,
percent:0,
paymentStatus:"Ожидает"

};

}



const investor = car.investor;



const profit =
Number(car.profit || 0);



const investorProfit =
profit * Number(investor.percent || 0) / 100;




document.getElementById("app").innerHTML = `



<div class="card">


<h2>
👤 Инвестор
</h2>



<div class="label">
Имя инвестора
</div>


<input
id="investorName"
class="input"
value="${investor.name || ""}"
placeholder="Имя"
>




<div class="label">
Сумма вложения
</div>


<input
id="investorAmount"
class="input"
value="${investor.amount || ""}"
placeholder="1000000"
>




<div class="label">
Доля %
</div>


<input
id="investorPercent"
class="input"
value="${investor.percent || ""}"
placeholder="50"
>




<div class="card">


<h3>
📊 Расчёт
</h3>



<p>

Прибыль автомобиля:

<b>

${profit.toLocaleString()} ₽

</b>

</p>



<p>

Прибыль инвестора:

<b class="profit">

${investorProfit.toLocaleString()} ₽

</b>

</p>



</div>





<select id="investorStatus" class="input">


<option value="Ожидает"
${investor.paymentStatus==="Ожидает"?"selected":""}>

Ожидает

</option>



<option value="Выплачен"
${investor.paymentStatus==="Выплачен"?"selected":""}>

Выплачен

</option>



</select>




<div class="button"
onclick="saveInvestorPayment(${car.id})">

💾 Сохранить

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



car.investor = {


name:
document.getElementById("investorName").value,


amount:
Number(
document.getElementById("investorAmount").value || 0
),


percent:
Number(
document.getElementById("investorPercent").value || 0
),


paymentStatus:
document.getElementById("investorStatus").value,


paymentDate:
new Date().toLocaleDateString()


};




if(!car.history){

car.history=[];

}



car.history.push({

date:
new Date().toLocaleDateString(),


action:
`Инвестор: ${car.investor.name}, статус выплаты: ${car.investor.paymentStatus}`

});




saveCars(cars);



alert("Инвестор сохранён");



openCarCard(carId);



}
