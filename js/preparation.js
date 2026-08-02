// AutoFlip CRM 2.0
// Подготовка автомобиля


function openPreparation(carId){


const cars = getCars();


const car = cars.find(
item => item.id === carId
);



if(!car){

alert("Автомобиль не найден");

return;

}



if(!car.preparation){

car.preparation = [];

}



document.getElementById("app").innerHTML = `


<div class="card">


<h2>
🔧 Подготовка
</h2>


<h3>
${car.brand} ${car.model}
</h3>


<div class="label">
Прогресс подготовки
</div>


<h2>

${getPreparationProgress(car)}%

</h2>



</div>



<div class="card">


<h3>
Добавить этап
</h3>


<input 
id="prepTitle"
class="input"
placeholder="Например: ТО"
>



<div class="button"
onclick="addPreparation(${car.id})">

Добавить

</div>



</div>



<div class="card">

${renderPreparation(car)}

</div>


`;

}



function addPreparation(carId){


const cars = getCars();


const car =
cars.find(
item=>item.id===carId
);



if(!car.preparation){

car.preparation=[];

}



car.preparation.push({

id:Date.now(),

title:
document.getElementById("prepTitle").value,


done:false,


date:
new Date().toLocaleDateString()

});



saveCars(cars);


openPreparation(carId);


}



function completePreparation(carId,prepId){


const cars=getCars();


const car =
cars.find(
item=>item.id===carId
);



const item =
car.preparation.find(
p=>p.id===prepId
);



item.done=true;



saveCars(cars);



openPreparation(carId);


}




function renderPreparation(car){


if(!car.preparation.length){

return "Этапов пока нет";

}



let html="";



car.preparation.forEach(item=>{


html += `


<div class="car-card">


<b>

${item.title}

</b>


<br><br>



${item.done 
? "✅ Выполнено"
: 
`
⏳ В работе

<br><br>

<div class="button"
onclick="completePreparation(${car.id},${item.id})">

Выполнить

</div>
`
}


</div>


`;



});



return html;


}




function getPreparationProgress(car){


if(!car.preparation ||
car.preparation.length===0){

return 0;

}



const done =
car.preparation.filter(
item=>item.done
).length;



return Math.round(
(done / car.preparation.length) * 100
);


}
