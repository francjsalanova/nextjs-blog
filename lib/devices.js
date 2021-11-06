const axios = require('axios');

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = addDays(startDate, 1);
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray.map((x) => { return x.getFullYear() + '-' + x.getMonth() + '-' + x.getDate() });
}

function getDevices(fromDate) {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ3YjlGejRia3dKZ0JpTllacU1KSEFBIiwidXNlck5hbWUiOiJvZ3V0aWVycmV6MUBhbXBlcmUtZW5lcmd5LmNvbSIsImVtYWlsIjoib2d1dGllcnJlekBhbXBlcmUtZW5lcmd5LmNvbSIsImxvY2FsZSI6ImVzLUVTIiwicm9sZUlkIjo5OCwiZXhwIjoxNjQyMzI1NzQyLjIzMiwiaWF0IjoxNjM0NTQ5NzQyfQ.td3sQ7sPwUZa46BegQ88BtJh9tQeZjWUC4fX2sbp7X8'
    const ApiKey = 'cY65Y0txjz1fF8Rs2xcYqPWoDSjgfJJ7nNsf5Pni'
    const headersApi = { 'x-api-key': ApiKey, 'x-access-token': token }

    const dates = getDates(fromDate, new Date());

    const options = {
        method: 'post',
        url: 'https://api.ampere-energy.cloud/devices/kpis/search',
        headers: headersApi,
        data: {
            "filters": {
                "date": dates
            },
            "pagination": {
                "page": 1,
                "pageLimit": 2000
            }
        }
    };

    const kpis = axios(options).then(response => response.data.kpis);
    return kpis;
}

export default getDevices