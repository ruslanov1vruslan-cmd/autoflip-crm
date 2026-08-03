// AutoFlip CRM 2.0
// Создание новой сделки


function openNewDeal(){


document.getElementById("app").innerHTML = `


<div class="card">

<h2>
➕ Новая сделка
</h2>


<div class="label">
Автомобиль
</div>


<br>


<input id="brand" class="input" placeholder="Марка">


<input id="model" class="input" placeholder="Модель">


<input id="year" class="input" placeholder="Год">


<input id="mileage" class="input" placeholder="Пробег">


<input id="vin" class="input" placeholder="VIN">


<input id="number" class="input" placeholder="Госномер">


<br>


<div class="label">
Цена покупки
</div>


<input id="buyPrice" class="input" placeholder="₽">


<br>


<div class="label">
Статус
</div>


<select id="status" class="input">

<option>
Куплено
</option>

<option>
Подготовка
</option>

<option>
В продаже
</option>

</select>



<div class="button" onclick="createCar()">

Создать автомобиль

</div>


</div>


`;



}



function createCar(){


const car = {



brand:
document.getElementById("brand").value,


model:
document.getElementById("model").value,


year:
document.getElementById("year").value,


mileage:
document.getElementById("mileage").value,


vin:
document.getElementById("vin").value,


number:
document.getElementById("number").value,


buyPrice:
document.getElementById("buyPrice").value,


status:
document.getElementById("status").value,


expenses:0,


salePrice:0,


profit:0


};



addCar(car);


const createPrep = confirm(
"Создать стандартную подготовку автомобиля?"
);


if(createPrep){

createDefaultPreparation(car.id);

}



alert("Автомобиль добавлен");



showCars();



}
