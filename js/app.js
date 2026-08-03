// AutoFlip CRM 2.0
// Главная страница


function loadHome(){



const stats = getAnalytics();




document.getElementById("app").innerHTML = `



<div class="card main-card">


<div class="label">

💰 Деньги в автомобилях

</div>



<div class="big-number">

${stats.moneyInCars.toLocaleString()} ₽

</div>


</div>






<div class="stats">



<div class="card">


<div class="label">

🚗 Автомобили

</div>


<div class="big-number">

${stats.carsCount}

</div>


</div>






<div class="card">


<div class="label">

📈 Прибыль

</div>


<div class="big-number">

${stats.totalProfit.toLocaleString()} ₽

</div>


</div>



</div>







<div class="card">


<div class="label">

Последние автомобили

</div>



<p>

В работе:
<b>
${stats.activeCars}
</b>

</p>



<p>

Продано:
<b>
${stats.soldCars}
</b>

</p>



</div>






<div class="button"
onclick="openNewDeal()">

➕ Новая сделка

</div>



`;



}
