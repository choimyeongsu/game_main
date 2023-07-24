const introTitle = document.getElementById("intro_title");
const arrow=document.getElementById("s1_arrow");
const game = document.getElementById("game");
arrow.style.display='none';


const title="Hello,\nGame\nWorld!";
console.log(title.length, title[title.length-1]);
let cnt = 0;


type = setInterval(()=>{
    let character=title[cnt++]; 
    
    if(character=="\n")
    {
        introTitle.innerHTML+="<br>";
    }
    else
    {
        introTitle.innerHTML+=character;
    }

    if(cnt==title.length)
    {
        console.log(cnt);
        clearInterval(type);
        arrow.style.display='flex';
    }
},300);

arrow.addEventListener("click",()=>{
    game.scrollIntoView({behavior:"smooth"});
});




