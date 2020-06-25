let myChart = document.querySelector(".myChart").getContext('2d');
let myCountry;
let confirmed = document.querySelector(".sidebar .confirmed h1")
let deceased = document.querySelector(".sidebar .deceased h1")
let recovered = document.querySelector(".sidebar .recovered h1")
let selectCountry = document.querySelector(".countrySelect")
let dataArr=[];
//find index of country in dropdown select
function findIndex(country){
    let options = document.querySelectorAll(".countrySelect option");
    console.log(options);

    for (let i = 0; i < options.length; i++){
        if (options[i].innerHTML.toLowerCase() == country){
            return i;
        } 
    }

}

//gets initial country
selectCountry.selectedIndex = 0;
fetchData('afghanistan');
fetchChart('afghanistan')

//my location
let locationBtn = document.querySelector(".location");
locationBtn.addEventListener("click", ()=>{
    //check for permissions
    if(!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
      } else {
        console.log("Locating...")
        navigator.geolocation.getCurrentPosition(success, error);
      }
        
      function error() {
        console.log('Unable to retrieve your location');
      }
    
      //success, then do a fetch to get the country
      function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAusMi-3V87loYO2rxGuh8tj5galXHWdEs`)
        .then(resp=>{
            return resp.json();
        })
        
        .then(data=>{

            let lastField = data.results[data.results.length-1]
            myCountry = lastField.formatted_address;
            console.log(myCountry);
            
            fetchData(myCountry.toLowerCase());
            fetchChart(myCountry.toLowerCase());
        })
    }

})

//=========================================================================
function fetchData(country){
    fetch("https://api.covid19api.com/summary").then(resp=>{
        return resp.json();
    })
    .then(data=>{
        let found = false;
        dataArr=[];
            //loop through to find the country
            for (let i = 0; i < data.Countries.length; i++){
                
                if (found == false){

                    if (data.Countries[i].Slug == country.toLowerCase()){
                        confirmed.innerHTML = data.Countries[i].TotalConfirmed.toLocaleString();
                        dataArr.push(data.Countries[i].TotalConfirmed)
                        deceased.innerHTML = data.Countries[i].TotalDeaths.toLocaleString();
                        dataArr.push(data.Countries[i].TotalDeaths)
                        recovered.innerHTML = data.Countries[i].TotalRecovered.toLocaleString();
                        dataArr.push(data.Countries[i].TotalRecovered)
                        
                        //find the index of the country in select list
                        selectCountry.selectedIndex = findIndex(data.Countries[i].Slug);

                        found = true;
                    }

                }
            }

            if (found == false){
                alert("An Error Occured, Please Try Again");
                confirmed.innerHTML = '';
                deceased.innerHTML = '';
                recovered.innerHTML = '';
            }
    })
}

function fetchChart(country){
    fetch(`https://api.covid19api.com/total/dayone/country/${country}`)
    .then(resp=>{
        return resp.json();
    })
    .then(data=>{
        console.log(data);
        Chart.defaults.global.defaultFontFamily = 'Lato';
        
        Chart.defaults.global.elements.line.fill = false;
        let lineChart = new Chart(myChart,{
            type: 'bar',

            // The data for our dataset
            data: {
                datasets: [{
                    label:'Confirmed',
                    backgroundColor: ['#87D68D'],
                    borderColor: ['#87D68D'],
                    data: [dataArr[0]]
                },
                {
                    label:'Deceased',
                    backgroundColor: '#EE6055',
                    borderColor: '#EE6055',
                    data: [dataArr[1]]
                },
                {
                    label:'Recovered',
                    backgroundColor: 'rgb(24, 212, 40)',
                    borderColor: 'rgb(24, 212, 40)',
                    data: [dataArr[2]]
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    display:true,
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

  












    }).catch(error=>{
        console.log(error);
    })

}

function toTimeStamp(date){
    //split the string from T
    
    //split the first item from -
    
    //create new format

    //turn into timestamp
}
//================================================================
selectCountry.addEventListener("change",()=>{
    let selectedCountry = selectCountry.value.toLowerCase();
    
    //call a fetch to display the top information
    fetchData(selectedCountry);

    //call a fetch to display the graph as well
    fetchChart(selectedCountry);
})





//build chart =======================================================

