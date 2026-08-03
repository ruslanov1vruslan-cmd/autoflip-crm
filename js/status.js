// AutoFlip CRM 2.0
// Общие статусы автомобилей


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


case "Куплено":

return "buy";


default:

return "buy";


}


}





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
