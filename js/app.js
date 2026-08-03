// AutoFlip CRM 2.0
// Главный контроллер



function loadHome(){


const cars = getCars();



let moneyInCars = 0;

let profit = 0;



cars.forEach(car=>{


moneyInCars +=
Number(car.buyPrice || 0)
+
Number(car.expenses || 0);



profit +=
Number(car.profit || 0);



});




document.getElementById("app").innerHTML = `



<div class="card main-card">


<div class="label">

💰 Деньги в автомобилях

</div>


<div class="big-number">

${moneyInCars.toLocaleString()} ₽

</div>


</div>





<div class="stats">



<div class="card">


<div class="label">

🚗 Автомобили

</div>


<div class="big-number">

${cars.length}

</div>


</div>





<div class="card">


<div class="label">

📈 Прибыль

</div>


<div class="big-number">

${profit.toLocaleString()} ₽

</div>


</div>



</div>





<div class="button"

onclick="openNewDeal()">

➕ Новая сделка

</div>



`;

}
