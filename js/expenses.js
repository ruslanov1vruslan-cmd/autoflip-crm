// AutoFlip CRM 2.0
// Расходы автомобиля


function addExpenseForm(carId){


document.getElementById("app").innerHTML = `


<div class="card">


<h2>
💸 Новый расход
</h2>



<div class="label">
Сумма
</div>



<input 
id="expenseAmount"
class="input"
placeholder="50000"
>



<div class="label">
Статья расхода
</div>



<select id="expenseCategory" class="input">


<option>
Ремонт
</option>


<option>
Запчасти
</option>


<option>
Мойка
</option>


<option>
Документы
</option>


<option>
Страховка
</option>


<option>
Другое
</option>


</select>




<div class="label">
Комментарий
</div>



<input
id="expenseComment"
class="input"
placeholder="Комментарий"
>




<div 
class="button"
onclick="saveExpense(${carId})">

Сохранить расход

</div>



<div 
class="button"
onclick="openCarCard(${carId})">

← Назад

</div>



</div>


`;

}



function saveExpense(carId){


const cars = getCars();



const car = cars.find(
item => item.id == carId
);



if(!car){

alert("Автомобиль не найден");

return;

}




const amount = Number(
document.getElementById("expenseAmount").value
);



if(!amount || amount <= 0){

alert("Введите сумму расхода");

return;

}




const expense = {


id: Date.now(),


category:
document.getElementById("expenseCategory").value,


amount: amount,


comment:
document.getElementById("expenseComment").value,


date:
new Date().toLocaleDateString()


};





if(!car.expensesList){

car.expensesList = [];

}



car.expensesList.push(expense);



car.expenses =
car.expensesList.reduce(

(sum,item)=>{

return sum + Number(item.amount);

},

0

);





if(!car.history){

car.history = [];

}




car.history.push({


date:
new Date().toLocaleDateString(),


action:
`Расход: ${expense.category} ${expense.amount.toLocaleString()} ₽`

});





saveCars(cars);



alert("Расход добавлен");



openCarCard(carId);


}
