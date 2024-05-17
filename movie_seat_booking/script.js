const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
const setMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Update total and count
const updataSelectedCount = function () {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // console.log(...selectedSeats);
  seatsIndex = [...selectedSeats].map((seat) => [...allSeats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  // const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeats.length;
  total.innerText = ticketPrice * selectedSeats.length;
  // console.log(selectedSeats.length);
};

/*
seats.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.add("selected");
  });
});
*/

// Get data form localstorage and populate UI
const populateUI = function () {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    allSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
      const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
      if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
      }
    });
  }
};
populateUI();

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, +e.target.value);
  // console.log(ticketPrice);
});

// Seat click event
container.addEventListener("click", (e) => {
  // console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // console.log(e.target);
    e.target.classList.toggle("selected");

    updataSelectedCount();
  }
});

// Intial count and total set
updataSelectedCount();
