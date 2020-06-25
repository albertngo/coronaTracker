let arrow = document.querySelector(".arrow");
let navigation = document.querySelector(".navigation ul");
let navToggle = false;
arrow.addEventListener("click", ()=>{
    event.stopPropagation();
    if (navToggle == false){
        navigation.style.right = "-10vw";
        navToggle = true;
    } else {
        navigation.style.right="-99vw";
        navToggle = false;
    }
    
})

window.addEventListener("click", ()=>{
        navigation.style.right="-99vw";
        navToggle = false;
    
})

window.addEventListener("resize",()=>{
    navigation.style.transition="none";
    navigation.style.right="-98";
    setInterval(()=>{
        navigation.style.transition="all .3s ease-in-out";
    },200)

})

//navigation
let homeBtn = document.querySelector(".home");
let graphBtn = document.querySelector(".graph");



homeBtn.addEventListener("click", ()=>{
    window.location = "/home"

})
graphBtn.addEventListener("click", ()=>{
    window.location = "/graph"

})


