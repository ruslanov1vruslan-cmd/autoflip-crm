// AutoFlip CRM 2.0
// Единая аналитика


function getAnalytics(){


const cars = getCars();



let moneyInCars = 0;

let totalBuy = 0;

let totalExpenses = 0;

let totalSales = 0;

let totalProfit = 0;

let activeCars = 0;

let soldCars = 0;



cars.forEach(car => {



const buy = Number(car.buyPrice || 0);

const expenses = Number(car.expenses || 0);

const sale = Number(car.salePrice || 0);




totalBuy += buy;

totalExpenses += expenses;




if(car.status === "Продано"){


soldCars++;



if(sale > 0){


totalSales += sale;


totalProfit += sale - buy - expenses;


}



}
else{


activeCars++;


moneyInCars += buy + expenses;


}



});





return {


carsCount: cars.length,


activeCars: activeCars,


soldCars: soldCars,


moneyInCars: moneyInCars,


totalBuy: totalBuy,


totalExpenses: totalExpenses,


totalSales: totalSales,


totalProfit: totalProfit


};



}
