// AutoFlip CRM 2.0
// Финансы


function showFinance(){


const cars = getCars();



let invested = 0;

let profit = 0;

let investorDebt = 0;



cars.forEach(car => {



invested +=
Number(car.buyPrice || 0)
+
Number(car.expenses || 0);



profit +=
Number(car.profit || 0);



if(
car.investorProfit &&
!car.investorPaid
){

investorDebt +=
Number(car.investorProfit);

}


});



document.getElementById("app").innerHTML = `


<div class="card main-card">


<div class="label">

📊 Чистая прибыль

</div>


<div class="big-number">

${profit.toLocaleString()} ₽

</div>


</div>



<div class="stats">


<div class="card">

<div class="label">

🚗 В автомобилях

</div>


<div class="stat-number">

${invested.toLocaleString()} ₽

</div>


</div>




<div class="card">

<div class="label">

👤 Инвесторам

</div>


<div class="stat-number">

${investorDebt.toLocaleString()} ₽

</div>


</div>



</div>



<div class="card">


<h3>

💵 Финансовая информация

</h3>


<p>

Автомобилей:

${cars.length}

</p>



<p>

Ожидают выплаты:

${investorDebt.toLocaleString()} ₽

</p>


</div>



`;

}
