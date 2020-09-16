//test
console.log('page is fully loaded');

// get elements
function _(query) {
  return document.querySelector(query);
}

function _all(query) {
  return document.querySelectorAll(query);
}

let content = {
  body: _("body"),
  header: _("header"),
  main: _("main"),
  hamburgerMenu: _(".hamburger_menu")
}

var control = _all(".play_pause_control");
var audios = _all("audio");
var cards = _all(".card");
var main = _(".content");




// click hamburger menu event
var topDistance = 0;

content.hamburgerMenu.addEventListener("click", function() {

  //toggle class
  content.header.classList.toggle("click_dropdown_menu");

  // after toggle
  if (content.header.classList.contains("click_dropdown_menu")) {
    // get scroll distance
    topDistance = window.scrollY;
    console.log("show");
    console.log(topDistance);
    // disable body scroll
    content.body.style.position = 'fixed';
    content.body.style.top = -topDistance + "px";
  }
  // toggle : back
  else {
    console.log("hide");
    content.body.style.position = "";
    content.body.style.top = "";
    window.scrollTo(0, topDistance);
  }

});


// sticky header

let sticky = content.header.offsetTop;

window.onscroll = function() {
  if (window.pageYOffset > sticky) {
    content.header.classList.add("sticky");
  } else {
    content.header.classList.remove("sticky");
  }
};



// click card's header  event
var topBefore = 0;

for (var i = 0; i < cards.length; i++) {
  // set cards position
  cards[i].style.top = (i * 200) + "px";
  //card's header onclick
  cards[i].firstElementChild.addEventListener("click", function() {
    // get thiscard and value
    var thisCard = this.parentNode;
    var cardHeight = window.getComputedStyle(thisCard).getPropertyValue("height");
    var cardParent = thisCard.parentNode;
    var nextSibling = thisCard.nextElementSibling;
    var nextSiblingIndex = Array.prototype.indexOf.call(cardParent.children, nextSibling);

    //test
    console.log(cardHeight);
    console.log("clicked");
    // toggle css class
    thisCard.classList.toggle("click_card");
    // after get class
    if (thisCard.classList.contains("click_card")) {
      // get scrollY distance
      topDistance = window.scrollY;
      //set to (0,0) top
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      while (nextSibling) {
        nextSibling.style.top = cardHeight;
        nextSibling.style.boxShadow = "none";
        nextSibling.style.transition = "top .4s ease-in-out";
        nextSibling = nextSibling.nextElementSibling;
      };
    }

    // toggle click again
    else {
      //sroll back after click again
      window.scrollTo({
        top: topDistance,
        behavior: "smooth"
      });
      //all cards back
      while (nextSibling) {
        nextSiblingIndex = Array.prototype.indexOf.call(cardParent.children, nextSibling);
        nextSibling.style.top = (nextSiblingIndex * 200) + "px";
        nextSibling.style.boxShadow = "0px -4px 16px rgba(0, 0, 0, 0.25)";
        nextSibling.style.transition = "top .4s ease-in-out";
        nextSibling = nextSibling.nextElementSibling;
      }
    }

  }); //click end
} // for end



// audio event --------------------------------------------------------------------
for (var i = 0; i < control.length; i++) {
  //3 kind color of icon
  if ((i + 1) % 3 == 1) {
    control[i].parentNode.parentNode.parentNode.classList.add("card_01");
    control[i].children[0].setAttribute("src", "images/play-01.svg");
    control[i].children[1].setAttribute("src", "images/pause-01.svg");
  } else if ((i + 1) % 3 == 2) {
    control[i].parentNode.parentNode.parentNode.classList.add("card_02");
    control[i].children[0].setAttribute("src", "images/play-02.svg");
    control[i].children[1].setAttribute("src", "images/pause-02.svg");
  } else {
    control[i].parentNode.parentNode.parentNode.classList.add("card_03");
    control[i].children[0].setAttribute("src", "images/play-03.svg");
    control[i].children[1].setAttribute("src", "images/pause-03.svg");

  }

  // click event------------------------------------------------------
  control[i].addEventListener("click", function() {

    //audio control play pause
    var audio = this.parentNode.previousElementSibling;
    audio.volume = 1;
    console.log(audio); //test
    //toogle
    if (audio.paused) {
      audio.play();
      this.classList.remove("paused");
    } else {
      audio.pause();
      this.classList.add("paused");
    }

    //seekbar
    var seekbar = this.nextElementSibling.nextElementSibling.firstElementChild;
    //every 1 second
    setInterval(function() {
      //prosess bar
      seekbar.value = parseInt((audio.currentTime / audio.duration) * 100); //%
      seekbar.style.background = 'linear-gradient(to right, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.12) ' + seekbar.value + '%, #fff ' + seekbar.value + '%, white 100%)';
    }, 1000);
      //change input value by user
      seekbar.addEventListener("change", function() {
        console.log('input just changed');//test
        audio.currentTime = seekbar.value * (audio.duration / 100);
      });


//audio time
    var timeTotal = this.nextElementSibling.children[1];
    var timeCurrent = this.nextElementSibling.children[0];

    //timeTotal
    let hour = Math.floor(audio.duration / 3600); //Round down 向下取整
    let left = Math.floor(audio.duration % 3600); //mod 求余
    let minute = Math.floor(left / 60);
    let second = Math.floor(left % 60);
    (hour < 10) && (hour = "0" + hour);// ture ->> second
    (minute < 10) && (minute = "0" + minute);
    (second < 10) && (second = "0" + second);
    timeTotal.innerHTML = minute + ":" + second;

    //timeCurrent
    audio.addEventListener("timeupdate", function() {
      let hour = Math.floor(audio.currentTime / 3600);
      let left = Math.floor(audio.currentTime % 3600);
      let minute = Math.floor(left / 60);
      let second = Math.floor(left % 60);
      (hour < 10) && (hour = "0" + hour);
      (minute < 10) && (minute = "0" + minute);
      (second < 10) && (second = "0" + second);
      timeCurrent.innerHTML = minute + ":" + second;
    });

    //audio ended
    audio.addEventListener("ended", function() {
      audio.pause();
      this.nextElementSibling.children[0].classList.add("paused");
    })

  }); //click event end--------------------------------------------


} //1st for loop end-------------------------------------------------------
