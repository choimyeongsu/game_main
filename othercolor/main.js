let palette = document.getElementById("palette");
let stage = document.getElementById("stage");
let timer = document.getElementById("timer");
const modal = document.getElementById("modal");
const modal_yes = document.getElementById("modal_yes");
const modal_success = document.getElementById("modal_success");
const closeBtn = modal.querySelector(".close-area");
const stagescore = modal.querySelector(".stage_score");
const yes_button = document.getElementById("yes_close");
const restart_button = document.getElementById("restart");


let timercount=15;
let stagelevel=1;
let time;
let colorsize=2; //처음 색상칸개수지정 
let falsenumber; //다른 색상이 들어갈 인덱스 
let color; //색상
let falsecolor; // 다른 색상
let array=document.getElementsByClassName("color");//class이름이 color인요소들
let line = document.getElementsByClassName("line");//class이름이 line인 요소들

let timerword = document.createElement('div');
timerword.innerHTML="&#128359; "+timercount;
timer.appendChild(timerword);

let stageword = document.createElement('div');
stage.innerHTML="stage : "+ stagelevel;
stage.appendChild(stageword);

function start() //타이머 
{
    time = setInterval(()=>{
        
        timercount--;
        timerword.innerHTML="&#128359; "+timercount;
        if(timercount==0)
        {
            no();
        }
    },1000);
}


function resetgame()
{
    stagelevel=1;
    stage.innerHTML="stage : "+ stagelevel;
    timercount=15;
    colorsize=2;
    palette.replaceChildren();
    execute();
}


function create() //html에 색깔이 들어갈 코드생성
{
    for(let i=0; i<colorsize; i++)
    {
        let line=document.createElement('div');
        line.setAttribute('class', "line");
        palette.appendChild(line);
        for(let j=0; j<colorsize; j++)
        {
            let temp=document.createElement('div');
            temp.setAttribute('class', "color");
            line.appendChild(temp);
        }
    }
}


function randomcolor() //랜덤하게 색상생성(헥스코드로반환)
{
  let color_r = Math.floor(Math.random() * 127 + 128).toString(16);
  let color_g = Math.floor(Math.random() * 127 + 128).toString(16);
  let color_b = Math.floor(Math.random() * 127 + 128).toString(16);
  return `#${color_r+color_g+color_b}`;
}


function CreateColor()
{
    falsenumber=Math.floor(Math.random()*(colorsize*colorsize)); //다른색상이들어갈넘버
    color = randomcolor();
    falsecolor = randomcolor();
    for(let i=0; i<(colorsize*colorsize); i++)
    {
        if(falsenumber==i) //다른색상지정 
        {  
            if(falsecolor==color) //같은색상이나올경우대비
            {
                falsecolor=randomcolor();
            }
            array[i].style.backgroundColor=falsecolor;
        }
        else
        {
            if(falsecolor==color) //같은색상이나올경우대비
            {
                color=randomcolor();
            }
            array[i].style.backgroundColor=color;      
        }
               
    }
}
function update()
{
    colorsize++;
    timercount=15;
    stagelevel++;
    stage.innerHTML="stage : " + stagelevel;
}

function no()
{
    modal.style.display="flex";
    stagescore.innerHTML="기록 : STAGE "+stagelevel;
    clearInterval(time);
    
} 
function yes() 
{
    if(stagelevel==5)
    {
        modal_success.style.display="flex";
        clearInterval(time);
    }
    else
    {
        modal_yes.style.display="flex";
        clearInterval(time);
    }
    
    
}

function CreateEvent() //각 색상요소들의 클릭이벤트생성 
{
    for(let i=0; i<(colorsize*colorsize); i++)
    {
        if(falsenumber===i) //틀린색상 즉 정답 클릭한경우
        {
            array[i].addEventListener("click", yes);
        }
        else
        {
            array[i].addEventListener("click", no);
        }
    }
}
closeBtn.addEventListener("click",e=>{
    
    modal.style.display="none";
    clearInterval(time);
    resetgame();
})

yes_button.addEventListener("click", e=>{
    modal_yes.style.display="none";
    palette.replaceChildren(); //이전생성한 색상삭제(자식노드삭제)
    update(); // 업데이트(color사이즈, 시간초기화, 스테이지레벨증가)
    execute();
})
restart_button.addEventListener("click", e=>{
    modal_success.style.display="none";
    clearInterval(time);
    resetgame();
})
function execute()
{
    create();
    CreateColor();
    CreateEvent();
    start();
}

execute();