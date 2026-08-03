// AutoFlip CRM 2.0
// Финансовый модуль


function showFinance(){


const cars = getCars();



let moneyInCars = 0;

let totalInvested = 0;

let totalExpenses = 0;

let totalSales = 0;

let totalProfit = 0;



cars.forEach(car => {



const buy = Number(car.buyPrice || 0);

const expenses = Number(car.expenses || 0);

const sale = Number(car.salePrice || 0);



totalInvested += buy;


totalExpenses += expenses;



// Деньги, которые сейчас находятся в автомобилях

if(car.status !== "Продано"){


moneyInCars += buy + expenses;


}




// Проданные автомобили

if(car.status === "Продано" && sale > 0){


totalSales += sale;


totalProfit += sale - buy - expenses;


}



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







<div class="card">


<h3>

📊 Финансы

</h3>




<p>

Всего вложено:

<br>

<b>

${totalInvested.toLocaleString()} ₽

</b>

</p>





<p>

Расходы:

<br>

<b>

${totalExpenses.toLocaleString()} ₽

</b>

</p>





<p>

Продажи:

<br>

<b>

${totalSales.toLocaleString()} ₽

</b>

</p>





<p>

Прибыль:

<br>

<b class="profit">

${totalProfit.toLocaleString()} ₽

</b>

</p>



</div>







<div class="card">


<h3>

🚗 Автомобили

</h3>


<p>

Всего:

<b>

${cars.length}

</b>

</p>


<p>

В работе:

<b>

${
cars.filter(
car => car.status !== "Продано"
).length

}

</b>

</p>


<p>

Продано:

<b>

${
cars.filter(
car => car.status === "Продано"
).length

}

</b>

</p>



</div>







<div class="button" onclick="loadHome()">

← Главная

</div>



`;



}
