// AutoFlip CRM 2.0
// Аналитика


function showAnalytics(){


const cars = getCars();


let sold = 0;

let totalProfit = 0;


cars.forEach(car=>{


if(car.status === "Продано"){

sold++;

totalProfit += Number(car.profit || 0);

}


});



let average = 0;


if(sold > 0){

average =
totalProfit / sold;

}



document.getElementById("app").innerHTML = `


<div class="card main-card">


<div class="label">

📈 Общая прибыль

</div>


<div class="big-number">

${totalProfit.toLocaleString()} ₽

</div>


</div>




<div class="stats">


<div class="card">


<div class="label">

Продано авто

</div>


<div class="stat-number">

${sold}

</div>


</div>




<div class="card">


<div class="label">

Средняя прибыль

</div>


<div class="stat-number">

${Math.round(average).toLocaleString()} ₽

</div>


</div>


</div>



<div class="card">

<h3>
🏆 Лучшие сделки
</h3>


<p>
Появятся после продаж
</p>


</div>


`;

}
