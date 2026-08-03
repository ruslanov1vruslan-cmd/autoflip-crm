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





function getStatusClass(status){


if(status === "В продаже"){

return "sale";

}


if(status === "Подготовка"){

return "prepare";

}


if(status === "Продано"){

return "sale";

}


if(status === "Резерв"){

return "prepare";

}


return "buy";


}





function getStatusIcon(status){


if(status === "Куплено"){

return "💰";

}


if(status === "Подготовка"){

return "🔧";

}


if(status === "В продаже"){

return "🟢";

}


if(status === "Резерв"){

return "🟡";

}


if(status === "Продано"){

return "✅";

}


return "🚗";


}
