var button=document.getElementById('counter');
button.onclick=function(){
	var request=new XMLHttpRequest();
	request.onreadystatechange=function (){
		if(request.readyState===XMLHttpRequest.DONE){
			if(request.status===200){
				var counter=request.reponseText;
				var span=document.getElementById('count');
				span.innerHTML=counter.toString();
			}
		}
	};
	request.open('GET','http://byash.imad.hasura-app.io/counter',true);
	request.send();
};