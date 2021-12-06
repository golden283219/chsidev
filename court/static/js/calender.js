let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
// let selectYear = document.getElementById("year");
// let selectMonth = document.getElementById("month");
const addTaskForm = document.getElementById('addTaskForm');

let submittedTaskDay, submittedTaskMonth, submittedTaskYear;
let selectedTasks = [
    {
        date: "2021-08-30",
        description: "Meeting1",
        menuOne: "option1",
        menuTwo: "option3",
        time: "August 3, 2021"
    },
    {
        date: "2021-08-3",
        description: "Meeting2",
        menuOne: "option1",
        menuTwo: "option3",
        time: "August 3, 2021"
    },
    {
        date: "2021-08-10",
        description: "Meeting2",
        menuOne: "option1",
        menuTwo: "option3",
        time: "August 10, 2021"
    },

];
let months = ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"];
//starts with sunday and ends with saturday (to be compatible with Date.getUTCDay())
const daysOfWeek = ['НЕДЕЛЯ', 'ПОНЕДЕЛНИК', 'ВТОРНИК', 'СРЯДА', 'ЧЕТВЪРТЪК', 'ПЕТЪК', 'СЪБОТА']; 

let monthAndYear = document.getElementById("monthAndYear");
let monthAndYearMob = document.getElementById("monthAndYearMob");
showCalendar(currentMonth, currentYear);
const dateInput = document.getElementById('date');
flatpickr("#date", {
    maxDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    disableMobile: true,
    onChange: function() {
        toggleFilledCLass(dateInput);
    }
});
initializeTimeRangePicker();


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    const headers = document.querySelectorAll('table thead tr th');
    headers.forEach(el => el.classList.remove('today'))
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    monthAndYearMob.innerHTML = months[month] + " " + year; //for mobile
    // selectYear.value = year;
    // selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                cell.classList.add('empty')
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createElement('h2');
                
                const correspondingDate = new Date(Date.UTC(currentYear, currentMonth, date));
                let weekDay = daysOfWeek[correspondingDate.getUTCDay()];

                cellText.innerHTML = `<div class="d-flex justify-content-between align-items-baseline">
                    <span class="d-md-none week-day">${weekDay}</span>
                    <span>${date < 10? '0'+date: date}</span>
                </div>`
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("today");
                    headers[j].classList.add("today");
                } // color today's date
                cell.appendChild(cellText);
                selectedTasks.forEach(task => {
                    const taskDay = +task.date.split('-')[2]
                    const taskMonth = +(task.date.split('-')[1]-1)
                    const taskYear = +task.date.split('-')[0]
                    if(date === taskDay && month === taskMonth && year === taskYear){
                        let taskContent = document.createElement('div');
                        taskContent.classList.add('task-content')
                        taskContent.innerHTML = `
                        <h2> ${task.menuOne} </h2>
                        <p> ${task.description} </p>
                        <p> ${task.time} </p>
                        `;
                        cell.appendChild(taskContent);
                    }
                })
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

addTaskForm.onsubmit = (ev) =>{
    ev.preventDefault();
    let submittedTask = {};
    submittedTask.menuOne = ev.target['0'].value
    submittedTask.menuTwo = ev.target['1'].value
    submittedTask.date = ev.target['2'].value
    submittedTask.time = ev.target['3'].value
    submittedTask.description = ev.target['4'].value;
    selectedTasks.push(submittedTask);
    addTaskToSelectedDay(submittedTask);
    closeModal();
} 

function addTaskToSelectedDay(task){
    submittedTaskDay = +task.date.split('-')[2]
    submittedTaskMonth = +(task.date.split('-')[1]-1)
    submittedTaskYear = +task.date.split('-')[0]
    showCalendar(submittedTaskMonth, submittedTaskYear)
}
function closeModal(){
    document.getElementById('addTaskModal').classList.remove('show'); 
    document.getElementById('addTaskModal').style.display = 'none'
}

function initializeTimeRangePicker() {
    const configObj = {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        clickOpens: false,
        altInput: true,
        disableMobile: true
    }
    const timeInput1 = document.getElementById('time1');
    const timeInput2 = document.getElementById('time2');

    const timePicker2 = flatpickr("#time2", {...configObj, 
        onChange: function () {
            toggleFilledCLass(timeInput2);
        }
    });
    const timePicker1 = flatpickr("#time1", {...configObj,
        onChange: function () {
            timePicker1.close();
            timePicker2.open();
            toggleFilledCLass(timeInput1);
        }
    });
    
    const timeRangeContainer = document.getElementById('time-range-container');
    timeRangeContainer.addEventListener('click', () => {
        timePicker1.open();
    })
}