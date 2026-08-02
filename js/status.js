// AutoFlip CRM 2.0
// Статусы автомобиля


function changeStatusForm(carId){


document.getElementById("app").innerHTML = `


<div class="card">


<h2>
🔄 Новый статус
</h2>



<select id="newStatus" class="input">


<option>
Куплено
</option>


<option>
Подготовка
</option>


<option>
В продаже
</option>


<option>
Резерв
</option>


<option>
Продано
</option>


</select>



<div 
class="button"
onclick="saveStatus(${carId})">

Изменить статус

</div>



</div>


`;

}




function saveStatus(carId){


const cars = getCars();


const car = cars.find(
item => item.id === carId
);



if(!car){

alert("Автомобиль не найден");

return;

}



const oldStatus = car.status;


const newStatus =
document.getElementById("newStatus").value;



car.status = newStatus;



if(!car.history){

car.history=[];

}



car.history.push({

date:
new Date().toLocaleDateString(),


action:
`Статус изменён: ${oldStatus} → ${newStatus}`

});



saveCars(cars);



alert("Статус обновлён");



openCarCard(carId);


}
