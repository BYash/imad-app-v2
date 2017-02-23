console.log('Loaded!');
var element=document.getElementById("main-text");
var img=document.getElementById("madi");
var leftmargin=0;
function moveright(){
    leftmargin=leftmargin+5;
}
img.onclick=function(){
    var interval=setInterval(moveright,50);
    element.innerHTML="You clicked the image!";
}
