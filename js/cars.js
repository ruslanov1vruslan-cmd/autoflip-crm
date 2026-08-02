// AutoFlip CRM 2.0
// Модуль автомобилей


function showCars(){

const cars = getCars();


let html = `

<div class="card">

<h2>🚗 Автомобили</h2>

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


<div class="car-card">


<h3>
${car.brand} ${car.model}
</h3>


<span class="status buy">

💰 ${car.status}

</span>


<br><br>


<div>

${car.year} год

</div>


<br>


<div>

Покупка:

<b>
${car.buyPrice} ₽
</b>

</div>


<br>


<div class="profit">

---

</div>



</div>


`;


});



document.getElementById("app").innerHTML = html;


}
