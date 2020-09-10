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

//

let player = {
	audio:_(".player audio"),
	seekbar:_(".player input"),
	playPauseControl:_(".player .controls .play_pause_control"),
	timeTotal:_(".player .audio_length_total"),
	timeCurrent:_(".player .audio_length_current"),
}


// control play pause
player.playPauseControl.addEventListener("click",function(){
	console.log(this);
  if(player.audio.paused){
    player.audio.play();
    this.classList.remove("paused");

  }
  else{
    player.audio.pause();
    this.classList.add("paused");

  }
});


// seekbar
setInterval(function(){
	player.seekbar.value = parseInt((player.audio.currentTime / player.audio.duration)*100);
	player.seekbar.style.background = 'linear-gradient(to right, #E49F96 0%, #E49F96 ' + player.seekbar.value + '%, #fff ' + player.seekbar.value + '%, white 100%)';
},1000);
player.seekbar.addEventListener("change",function(){
	console.log('input changed');
	player.audio.currentTime = player.seekbar.value*(player.audio.duration / 100 );

});


// timeTotal

player.audio.addEventListener("loadedmetadata",function(){
	console.log('page is fully loaded');
	let hour = Math.floor (player.audio.duration / 3600);//向下取整
	let left = Math.floor(player.audio.duration % 3600);//求余
	let minute = Math.floor(left / 60);
	let second = Math.floor(left % 60);
	(hour<10)&&(hour = "0" + hour);
	(minute<10)&&(minute = "0" + minute);
	(second<10)&&(second = "0" + second);
	player.timeTotal.innerHTML = minute + ":" +second;
})


//timeCurrent

player.audio.addEventListener("timeupdate",function(){
	let hour = Math.floor (player.audio.currentTime / 3600);//向下取整
	let left = Math.floor(player.audio.currentTime % 3600);//求余
	let minute = Math.floor(left / 60);
	let second = Math.floor(left % 60);
	(hour<10)&&(hour = "0" + hour);
	(minute<10)&&(minute = "0" + minute);
	(second<10)&&(second = "0" + second);
	player.timeCurrent.innerHTML = minute + ":" +second;

})


// audio end

player.audio.addEventListener("ended",function(){
	player.audio.pause();
	player.playPauseControl.classList.add("paused");
})
