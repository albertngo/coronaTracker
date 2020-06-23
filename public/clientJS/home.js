fetch("https://api.covid19api.com/summary").then(resp=>{
        return resp.json();
    })
    .then(data=>{
        console.log(data.Countries);
        
    })

//search feature
let table = document.querySelector(".statTable");
let originalList = document.querySelector(".tBody");
let originalListChildren = originalList.children;
let search = document.querySelector(".search");


function searchList(){
    //erase all of tbody's children
    let removeList = document.querySelector(".tBody");
    removeList.remove();

    if (!search.value) {
        //repaint entire list
        table.appendChild(originalList);
    } else{
        let searchValue = search.value;
        let regExp = new RegExp (`^${searchValue}`);
        let tBody = document.createElement("tbody");
        tBody.className = "tBody";
        
        //loop through entire country list, if match, call function and make the node
        for (let country of Array.from(originalListChildren)){

            //use the name to compare 
            if (regExp.test(country.children[0].innerHTML)){
                tBody.appendChild(country);        
            }
        }
        table.appendChild(tBody);
    }
}


search.addEventListener("keypress", (event)=>{

    if (event.keyCode == 13) searchList();


})