// AutoFlip CRM 2.0
// Автомобили


function showCars(filter = "Все"){


const cars = getCars();


let filteredCars = cars;



if(filter !== "Все"){


filteredCars = cars.filter(car => 
car.status === filter
);


}



let html = `


<div class="card">


<h2>
🚗 Автомобили
</h2>


<div class="label">

Всего автомобилей: ${cars.length}

</div>


</div>




<div class="card">


<div class="filter-row">


<button onclick="showCars('Все')">
Все
</button>


<button onclick="showCars('Куплено')">
💰 Куплено
</button>


<button onclick="showCars('Подготовка')">
🔧 Подготовка
</button>


<button onclick="showCars('В продаже')">
🟢 В продаже
</button>


<button onclick="showCars('Резерв')">
🟡 Резерв
</button>


<button onclick="showCars('Продано')">
✅ Продано
</button>


</div>


</div>





<div class="button" onclick="openNewDeal()">

➕ Добавить автомобиль

</div>


`;





if(filteredCars.length === 0){


html += `


<div class="card">

<center>

🚗

<h3>
Нет автомобилей
</h3>


</center>

</div>


`;



}





filteredCars.forEach(car => {


html += `


<div class="car-card"
onclick="openCarCard(${car.id})">


<h3>

${car.brand || ""} ${car.model || ""}

</h3>



<span class="status ${statusClass(car.status)}">

${statusIcon(car.status)}
${car.status || ""}

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



</div>


`;


});




document.getElementById("app").innerHTML = html;



}





function statusClass(status){


if(status === "В продаже") return "sale";


if(status === "Подготовка") return "prepare";


if(status === "Продано") return "sale";


if(status === "Резерв") return "prepare";


return "buy";


}





function statusIcon(status){


if(status === "Куплено") return "💰";


if(status === "Подготовка") return "🔧";


if(status === "В продаже") return "🟢";


if(status === "Резерв") return "🟡";


if(status === "Продано") return "✅";


return "🚗";


}
