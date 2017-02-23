console.log('Loaded!');
var element=document.getElementById("main-text");
var img=document.getElementById("madi");
var marginLeft=0,i=0;
function moveright(){
    if(i<300){
    marginLeft=marginLeft+5;
    img.style.marginLeft=marginLeft+"px";
    i=i+5;
    }
}
img.onclick=function(){
    var interval=setInterval(moveright,50);
    element.innerHTML="You clicked the image!";
};

