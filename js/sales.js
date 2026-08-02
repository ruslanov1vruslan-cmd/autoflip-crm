// AutoFlip CRM 2.0
// Продажа автомобиля


function sellCarForm(carId){


document.getElementById("app").innerHTML = `


<div class="card">


<h2>
💰 Продажа автомобиля
</h2>


<div class="label">
Цена продажи
</div>


<input 
id="salePrice"
class="input"
placeholder="3500000"
>


<div class="label">
Процент инвестора
</div>


<input 
id="investorPercent"
class="input"
value="30"
>


<div class="button"
onclick="sellCar(${carId})">

Завершить продажу

</div>


</div>


`;

}




function sellCar(carId){


const cars = getCars();


const car = cars.find(
item => item.id === carId
);



if(!car){

alert("Автомобиль не найден");

return;

}



const salePrice =
Number(
document.getElementById("salePrice").value
);



const investorPercent =
Number(
document.getElementById("investorPercent").value
);



const buy =
Number(car.buyPrice || 0);



const expenses =
Number(car.expenses || 0);



const profit =
salePrice - buy - expenses;



const investorProfit =
profit * investorPercent / 100;



car.salePrice = salePrice;


car.profit = profit;


car.investorProfit = investorProfit;


car.status = "Продано";



if(!car.history){

car.history=[];

}



car.history.push({

date:
new Date().toLocaleDateString(),


action:
`Автомобиль продан. Прибыль ${profit.toLocaleString()} ₽`

});



saveCars(cars);



alert(
"Продажа завершена"
);



openCarCard(carId);


}
