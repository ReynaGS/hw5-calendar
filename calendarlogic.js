var myStorage = window.localStorage;

$(document).ready(function () {
  Main();
});
var newActivityList = ['', '', '', '', '', '', '', '', ''];
function getCurrentActivity(index) {
  return newActivityList[index];
}
function getTimeString(index) {
  var timeArray = [
    '9 am',
    '10 am',
    '11 am',
    '12 pm',
    '1 pm',
    '2 pm',
    '3 pm',
    '4 pm',
    '5 pm',
  ];
  return timeArray[index];
  // validate that this index is valid.
}

function getColor(hour) {
  var currenthour = moment().hour();
  //   console.log(currenthour);
  hour = hour + 9;
  if (hour < currenthour) {
    return 'bg-secondary';
  } else if (hour > currenthour) {
    return 'bg-success';
  } else if (hour === currenthour) {
    return 'bg-danger';
  }
  return 'bg-secondary';
}
function attachEvent(index) {
  console.log(index);
  $('#button-addon' + index).click(function () {
    var value = $('#newActivity' + index).val();
    console.log(value);
    newActivityList.splice(index, 1, value);
    console.log(newActivityList);
    myStorage.setItem(index, value);
  });
}
function loadOldList() {
  for (var i = 0; i < 9; i++) {
    var activities = myStorage.getItem(i);
    if (activities != null) {
      newActivityList[i] = activities;
    }
  }
}
function Main() {
  var currentDate = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  $('#currentDay').html(currentDate);
  loadOldList();
  var timeBlock = '';
  for (var i = 0; i < 9; i++) {
    timeBlock =
      timeBlock + '<div class="input-group mb-3" id="groupBlock' + i + '">';
    timeBlock =
      timeBlock +
      '<div class="input-group-prepend"><h4><span class="badge badge-secondary">' +
      getTimeString(i) +
      '</span></h4></div>';
    timeBlock =
      timeBlock +
      '<input value = " ' +
      getCurrentActivity(i) +
      '" type = "text" id= "newActivity' +
      i +
      '" class = " form-control ' +
      getColor(i) +
      '" placeholder = "Add your Activity" aria-label = "add your new activity"></input>';

    timeBlock =
      timeBlock +
      '<div class = "input-group-append"> <button class="btn btn-outline-secondary" type="button" id="button-addon' +
      i +
      '"> Add Event </button> </div>';

    timeBlock = timeBlock + '</div>';
  }
  $('#timeBlockContainer').html(timeBlock);
  for (var i = 0; i < 9; i++) {
    attachEvent(i);
  }
}
