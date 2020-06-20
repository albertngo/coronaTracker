let arrow = document.querySelector(".arrow");
let navigation = document.querySelector(".navigation ul");
let navToggle = false;
arrow.addEventListener("click", ()=>{
    if (navToggle == false){
        navigation.style.right = "-10vw";
        navToggle = true;
    } else {
        navigation.style.right="-99vw";
        navToggle = false;
    }
    
})

window.addEventListener("resize",()=>{
    navigation.style.transition="none";
    navigation.style.right="-98";
    setInterval(()=>{
        navigation.style.transition="all .3s ease-in-out";
    },200)

})
