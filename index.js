const periodsNav = document.querySelectorAll('.periods__link');
let cardContent = document.querySelectorAll('.card__content');
let previous = document.querySelectorAll('.card__previous');
let period = 'weekly';
let data;

// Add listener to links
periodsNav.forEach((link) => {
  link.addEventListener('click', (e) => {
    period = e.target.dataset.link;
    periodsNav.forEach((link) => {
      link.classList.remove('active');
    });
    e.target.classList.add('active');
    displayData();
  });
});
//Get data from JSON file
const getData = async () => {
  try {
    let dat = await fetch('./data.json');
    data = await dat.json();
    displayData();
  } catch (err) {
    alert('Faild download the data');
  }
};
//Display data
const displayData = () => {
  cardContent.forEach((el) => {
    data.forEach((obj) => {
      if (obj.title === el.dataset.title) {
        el.querySelector(
          '.card__hours'
        ).textContent = `${obj.timeframes[period].current}hrs`;
        el.querySelector(
          '.card__last>span'
        ).textContent = ` ${obj.timeframes[period].previous}hrs`;
      }
    });
  });
};

getData();
