// Your code here
function createEmployeeRecord(array){
    let employeeRecordObj = {}

    employeeRecordObj.firstName = array[0];
    employeeRecordObj.familyName = array[1];
    employeeRecordObj.title = array[2];
    employeeRecordObj.payPerHour = array[3];
    employeeRecordObj.timeInEvents = [];
    employeeRecordObj.timeOutEvents = [];

return employeeRecordObj
}

function createEmployeeRecords(arrayOfArrays){
    let employeeRecordsArr = [];
    for (let i = 0; i< arrayOfArrays.length; i++){
        employeeRecordsArr.push(createEmployeeRecord(arrayOfArrays[i]))
    }
    return employeeRecordsArr
}

function createTimeInEvent(employeeRecordObj, dateStamp){
    let timeInEvent = {}
    timeInEvent.type = "TimeIn"
    timeInEvent.date = dateStamp.substring(0,10)
    timeInEvent.hour = parseInt(dateStamp.substring(11, 15))

    employeeRecordObj.timeInEvents.push(timeInEvent)
    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp){
    let timeOutEvent = {}
    timeOutEvent.type = "TimeOut"
    timeOutEvent.date = dateStamp.substring(0,10)
    timeOutEvent.hour = parseInt(dateStamp.substring(11, 15))

    employeeRecordObj.timeOutEvents.push(timeOutEvent)
    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, formDate){

    let targetTimeInEvent = employeeRecordObj.timeInEvents.find(inEvent=>inEvent.date === formDate)

    let targetTimeOutEvent = employeeRecordObj.timeOutEvents.find(outEvent=> outEvent.date ===formDate)

    let hoursWorked = (targetTimeOutEvent.hour - targetTimeInEvent.hour)/100

    return hoursWorked
}


function wagesEarnedOnDate(employeeRecordObj, formDate){

    let payOwed = hoursWorkedOnDate(employeeRecordObj, formDate) * employeeRecordObj.payPerHour 

    return payOwed
}

function allWagesFor(employeeRecordObj){
    let arrayOfTimeInEvents = employeeRecordObj.timeInEvents.map((event)=> event.date);
    let totalWages = 0;
    for (let i = 0; i < arrayOfTimeInEvents.length; i++){
        let wagesPerDate= wagesEarnedOnDate(employeeRecordObj, arrayOfTimeInEvents[i]);
        totalWages+= wagesPerDate
    }
    return totalWages
}

function calculatePayroll(arrayOfRecordObj){
    let totalPayroll = 0
    for (let i = 0; i< arrayOfRecordObj.length; i++){
        let aggregateWages = allWagesFor(arrayOfRecordObj[i]);
        totalPayroll+= aggregateWages
    }
    return totalPayroll
}