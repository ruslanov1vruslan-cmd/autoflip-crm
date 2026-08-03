// AutoFlip CRM 2.0
// Главная страница и расчёты


function loadHome(){


const cars = getCars();



let moneyInCars = 0;

let totalProfit = 0;



cars.forEach(car => {



const buy =
Number(car.buyPrice || 0);



const expenses =
Number(car.expenses || 0);



const sale =
Number(car.salePrice || 0);





// Деньги в автомобилях считаем только по активным авто

if(car.status !== "Продано"){

moneyInCars += buy + expenses;

}





// Прибыль считаем после продажи

if(car.status === "Продано" && sale > 0){


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

${totalProfit.toLocaleString()} ₽

</div>


</div>



</div>







<div class="card">


<div class="label">

Последние автомобили

</div>



${
cars.length === 0

?

"<p>Нет автомобилей</p>"

:

cars.slice(-3).reverse().map(car => `


<div class="car-card"
onclick="openCarCard(${car.id})">


<b>

${car.brand || ""} ${car.model || ""}

</b>


<br><br>


<span class="status ${getStatusClass(car.status)}">

${getStatusIcon(car.status)}

${car.status}

</span>


<br><br>


Покупка:

${Number(car.buyPrice || 0).toLocaleString()} ₽


</div>


`).join("")

}


</div>






<div class="button"
onclick="openNewDeal()">

➕ Новая сделка

</div>



`;



}
