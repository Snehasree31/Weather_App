let weather = {
    "apikey": "a822fc78e8489abb172cc53dfc2d2d77",
    fetchWeather: function (city) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q="
          +city+
          "&units=matric&appid="
          +this.apikey
        )
        .then((response) => 
        {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
      },

    displayWeather: function(data){
        const{name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        console.log(name,icon,description,temp,humidity);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp+ " K";
        document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
      
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-input").value);
  },
};

var btn=document.getElementById("btn")
if (btn){
  btn.addEventListener("click", function() 
{
  weather.search();
});
};
    
document
  .querySelector(".search-input")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Paris");