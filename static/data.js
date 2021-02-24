const participants = ['Neil', 'Sarah', 'Aaron', 'Ewan', 'April'];

const days = [];
let startDay = new Date(2021, 1, 21);
for (let i = 0; i < 5; i++){
   let time = startDay.setDate(startDay.getDay() + 1);
   let day = (new Intl.DateTimeFormat('en-GB',{ weekday: 'short'}).format(time))
   days.push(day)
};

const hours = [];
let startHour = new Date(2021, 1, 21, 10);
for (let i = 10; i <= 18; i++){
let timestamp = startHour.setHours(i)
let hour = (new Intl.DateTimeFormat('en-GB',{ timeStyle: 'short'}).format(timestamp))
hours.push(hour)
}

export { days, hours, participants };

