function validateInputs(startDate, endDate, city) {
    const regexCity = new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    let today = new Date();
    today = today.getFullYear() + '-' + 
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

    //validate city only accepting strings, start date should be greater than end date & start date should be greater than or equal current date
    if ((regexCity.test(city)) && (start <= end) && (today <= startDate)) {
        return true;
    } else {
        return false;
    }
}

export { validateInputs }