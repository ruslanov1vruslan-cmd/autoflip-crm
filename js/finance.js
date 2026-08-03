// AutoFlip CRM 2.0
// Финансы через единый расчёт



function showFinance(){


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





<div class="card">


<h3>
📊 Финансовый отчёт
</h3>



<p>

Всего автомобилей:

<b>

${stats.carsCount}

</b>

</p>




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





<p>

Всего вложено:

<b>

${stats.totalBuy.toLocaleString()} ₽

</b>

</p>





<p>

Расходы:

<b>

${stats.totalExpenses.toLocaleString()} ₽

</b>

</p>





<p>

Продажи:

<b>

${stats.totalSales.toLocaleString()} ₽

</b>

</p>





<p class="profit">

Прибыль:

${stats.totalProfit.toLocaleString()} ₽

</p>



</div>






<div class="button" onclick="loadHome()">

← Главная

</div>



`;



}
