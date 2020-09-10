
function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}


//
let content = {
	header:_("header"),
	main:_("main"),
	hamburgerMenu: _(".hamburger_menu")
}

let hamburgerMenu = _(".hamburger_menu");
content.hamburgerMenu.addEventListener("click",function(){
	content.header.classList.toggle("click_dropdown_menu");
})



let sticky = content.header.offsetTop;
window.onscroll = function() {
	if (window.pageYOffset > sticky) {
    content.header.classList.add("sticky");
  } else {
    content.header.classList.remove("sticky");
  }
};



console.log('page is fully loaded');

var control = _all(".play_pause_control");
var audios = _all("audio");




for (var i = 0 ; i<control.length;i++){

	if((i+1) % 3 == 1){
		control[i].parentNode.parentNode.parentNode.classList.add("card_01");
		control[i].children[0].setAttribute("src","images/play-01.svg");
		control[i].children[1].setAttribute("src","images/pause-01.svg");
	}
	else if ((i+1) % 3 == 2) {
		control[i].parentNode.parentNode.parentNode.classList.add("card_02");
		control[i].children[0].setAttribute("src","images/play-02.svg");
		control[i].children[1].setAttribute("src","images/pause-02.svg");
	}
	else{
		control[i].parentNode.parentNode.parentNode.classList.add("card_03");
		control[i].children[0].setAttribute("src","images/play-03.svg");
		control[i].children[1].setAttribute("src","images/pause-03.svg");

	}

			// click event
		control[i].addEventListener("click",function(){

			//audio control play pause
			var audio = this.parentNode.previousElementSibling;
			console.log(audio);//test

			if(audio.paused){
		    audio.play();
		    this.classList.remove("paused");
		  }
		  else{
		    audio.pause();
		    this.classList.add("paused");
		  }

	//seekbar
	var seekbar = this.nextElementSibling.nextElementSibling.firstElementChild;
	setInterval(function(){
		seekbar.value = parseInt((audio.currentTime / audio.duration)*100);//%
		seekbar.style.background = 'linear-gradient(to right, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.12) ' + seekbar.value + '%, #fff ' + seekbar.value + '%, white 100%)';
	},1000);//every 1 second
		seekbar.addEventListener("change",function(){
		console.log('input just changed');
		audio.currentTime = seekbar.value*(audio.duration / 100 );
	});

//time
var timeTotal = this.nextElementSibling.children[1];
var timeCurrent = this.nextElementSibling.children[0];

//timeTotal
let hour = Math.floor (audio.duration / 3600);//向下取整
let left = Math.floor(audio.duration % 3600);//求余
let minute = Math.floor(left / 60);
let second = Math.floor(left % 60);
(hour<10)&&(hour = "0" + hour);
(minute<10)&&(minute = "0" + minute);
(second<10)&&(second = "0" + second);
timeTotal.innerHTML = minute + ":" +second;

//timeCurrent
audio.addEventListener("timeupdate",function(){
	let hour = Math.floor (audio.currentTime / 3600);//向下取整
	let left = Math.floor(audio.currentTime % 3600);//求余
	let minute = Math.floor(left / 60);
	let second = Math.floor(left % 60);
	(hour<10)&&(hour = "0" + hour);
	(minute<10)&&(minute = "0" + minute);
	(second<10)&&(second = "0" + second);
	timeCurrent.innerHTML = minute + ":" +second;
});

//audio ended
audio.addEventListener("ended",function(){
	audio.pause();
	this.nextElementSibling.children[0].classList.add("paused");
})

});//click event end


}//1st for loop end


// for(i=0;i<audios.length;i++){
//
// 	audios[i].addEventListener("loadedmetadata",function(){
//
// 		var timeTotal = this.nextElementSibling.children[1].children[1];
// 		let hour = Math.floor (this.duration / 3600);//向下取整
// 		let left = Math.floor(this.duration % 3600);//求余
// 		let minute = Math.floor(left / 60);
// 		let second = Math.floor(left % 60);
// 		(hour<10)&&(hour = "0" + hour);
// 		(minute<10)&&(minute = "0" + minute);
// 		(second<10)&&(second = "0" + second);
// 		timeTotal.innerHTML = minute + ":" +second;
// 	});
// }
