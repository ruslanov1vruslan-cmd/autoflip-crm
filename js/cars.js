// AutoFlip CRM 2.0
// Модуль автомобилей


function showCars(){


const cars = getCars();


let html = `


<div class="card">

<h2>
🚗 Автомобили
</h2>


<div class="label">

Всего автомобилей: ${cars.length}

</div>


</div>



<div class="button" onclick="openNewDeal()">

➕ Добавить автомобиль

</div>


`;



if(cars.length === 0){


html += `


<div class="card">


<center>

🚗


<h3>
Автомобилей пока нет
</h3>


<p>
Добавьте первую сделку
</p>


</center>


</div>


`;

}



cars.forEach(car => {



html += `


<div class="car-card" onclick="openCarCard(${car.id})">



<h3>

${car.brand} ${car.model}

</h3>



<span class="status ${getStatusClass(car.status)}">

${getStatusIcon(car.status)}
${car.status}

</span>



<br><br>



<div>

${car.year || "-"} год

</div>



<br>



<div>

Пробег:

<b>

${car.mileage || 0} км

</b>

</div>



<br>



<div>

Покупка:

<b>

${Number(car.buyPrice || 0).toLocaleString()} ₽

</b>

</div>



<br>



<div>

Расходы:

<b>

${Number(car.expenses || 0).toLocaleString()} ₽

</b>

</div>



<br>



<div class="profit">


${
Number(car.profit || 0) > 0

?

"+" + Number(car.profit).toLocaleString() + " ₽"

:

"В процессе"

}


</div>



</div>



`;



});



document.getElementById("app").innerHTML = html;


}





// Цвет статуса

function getStatusClass(status){


switch(status){


case "В продаже":

return "sale";


case "Подготовка":

return "prepare";


case "Продано":

return "sale";


case "Резерв":

return "prepare";


default:

return "buy";


}



}





// Иконки статусов

function getStatusIcon(status){


switch(status){


case "Куплено":

return "💰";


case "Подготовка":

return "🔧";


case "В продаже":

return "🟢";


case "Резерв":

return "🟡";


case "Продано":

return "✅";


default:

return "🚗";


}


}



document.getElementById("app").innerHTML = html;


}
