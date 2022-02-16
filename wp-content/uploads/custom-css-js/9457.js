<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
const getTime = dateTo => {
    let now = new Date(),
        time = (new Date(dateTo) - now + 1000) / 1000,
        seconds = ('0' + Math.floor(time % 60)).slice(-2),
        minutes = ('0' + Math.floor(time / 60 % 60)).slice(-2),
        hours = ('0' + Math.floor(time / 3600 % 24)).slice(-2),
        days = Math.floor(time / (3600 * 24));

    return {
        seconds,
        minutes,
        hours,
        days,
        time
    }
};

const elementHTLM = (day, hour, minute, currenTime) => {
  day.innerHTML = currenTime.days;
  hour.innerHTML = currenTime.hours;
  minute.innerHTML = currenTime.minutes;  
}

const countdown = (dateTo) => {
  
  const MyDay = document.querySelector('#MyDay');
  const MyHour = document.querySelector('#MyHour');
  const MyMinute = document.querySelector('#MyMinute');
 
  let currenTime = getTime(dateTo);
  if (currenTime.time < 1) {
    MyDay.innerHTML = '00';
    MyHour.innerHTML = '00';
    MyMinute.innerHTML = '00';
    return;
  }
  elementHTLM( MyDay, MyHour, MyMinute, currenTime );
  
  const timerUpdate = setInterval( () => {
    currenTime = getTime(dateTo);
    elementHTLM( MyDay, MyHour, MyMinute, currenTime );

    if (currenTime.time < 1) {
      clearInterval(timerUpdate);
      MyDay.innerHTML = '00';
      MyHour.innerHTML = '00';
      MyMinute.innerHTML = '00';  
    }
  }, 60000);
}


setTimeout( () => {
  countdown( new Date(2022, 1, 28, 8,0,0) );
}, 3000);


</script>
<!-- end Simple Custom CSS and JS -->
