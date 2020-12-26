const {ipcRenderer} = require('electron')
class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<nav id="side-nav">
        <ul>
           <li class="sub-menu-link"><a href="#">Manage</a></li>
           <ul class="side-nav-sub-menu">
              <li onclick="getItem(event, 'credentials')"> <a href="#">Credentials</a></li>
              <li onclick="getItem(event, 'routine')"><a href="#">Todo-Items</a></li>
              <li onclick="getItem(event, 'billpayment')"><a href="#">Bill-payments</a></li>
              <li onclick="getItem(event, 'files')"><a href="#">Files</a></li>
           </ul>
           <li class="sub-menu-link">
              <a href="#">Tools</a>
           </li>
           <ul class="side-nav-sub-menu">
              <li onclick="getItem(event, 'calendar')"> <a href="#">Calendar</a></li>
              <li onclick="getItem(event, 'calculator')"><a href="#">Calculator</a></li>
              <li onclick="getItem(event, 'musicplayer')"><a href="#">Music Player</a></li>
           </ul>
           <li class="sub-menu-link"><a href="#">Explore Web</a></li>
           <ul class="side-nav-sub-menu">
              <li id="facebookwindow"><a href="#">Facebook</a></li>
              <li id="instawindow"><a href="#">Instagram</a></li>
              <li id="twitterwindow"><a href="#"> Twitter</a></li>
              <li id="googlewindow"><a href="#"> Google</a></li>
              <li id="youtubewindow"><a href="#"> Youtube</a></li>
              <li id="closewindow"><a href="#"> Close All</a></li>
           </ul>
           <li onclick="getItem(event, 'browser')"> <a href="#">Browse</a></li>
           <li onclick="getItem(event, 'news')"> <a href="#">In News</a></li>
        </ul>
        <span id="show-nav"><i class="material-icons">arrow_forward</i></span>
     </nav>
  `
    }
}



function getItem(evt, pageName) {
   var i, pageitem;
   pageitem = document.getElementsByClassName("pageitem");
   for (i = 0; i < pageitem.length; i++) {
      pageitem[i].style.display = "none";
   }
   document.getElementById(pageName).style.display = "block";
   evt.currentTarget.className += " active";
}

function addCustomElementNavBar() {
   customElements.define("app-nav", NavBar); // (2)
   const nav = document.getElementById('side-nav');
   const showNavBtn = document.getElementById('show-nav');
   const container = document.getElementById('container');
   const navWidth = 15; // rems
   const navGutter = 1;
   
   nav.addEventListener('click', (event) => {
      if (event.target.classList.contains('sub-menu-link')) {
         event.target.classList.toggle('active');
         const subMenu = event.target.nextElementSibling;
         subMenu.classList.toggle('active');
      }
   });
   
   showNavBtn.addEventListener('click', (event) => {
      if (nav.style.left !== '0px') {
         showNavBtn.classList.toggle('open');
         nav.classList.toggle('open');
         container.classList.toggle('nav-open');
         document.body.style.overflow = 'hidden';
      } else {
         showNavBtn.classList.toggle('open');
         nav.classList.toggle('open');
         container.classList.toggle('nav-open');
         document.body.style.overflow = 'auto';
      }
   }, nav); 
   console.log("Nav bar!");
}

window.ipc = window.ipc || {},
function(n) {
ipc.messaging = {

 sendOpenSecondWindowEvent: function(message) {
   ipcRenderer.send('open-second-window', message)
 },

 sendCloseSecondWindowEvent: function(message) {
   ipcRenderer.send('close-second-window', message)
 },

 init: function() {
   $('#facebookwindow').click( function () {
         ipc.messaging.sendOpenSecondWindowEvent("http://www.facebook.com")
   })

   $('#googlewindow').click( function () {
         ipc.messaging.sendOpenSecondWindowEvent("http://www.google.com")
   })

   $('#instawindow').click( function () {
         ipc.messaging.sendOpenSecondWindowEvent("http://www.instagram.com")
   })

   $('#twitterwindow').click( function () {
         ipc.messaging.sendOpenSecondWindowEvent("http://www.twitter.com")
   })

   $('#youtubewindow').click( function () {
      ipc.messaging.sendOpenSecondWindowEvent("http://www.youtube.com")
})

   $('#closewindow').click( function () {
         ipc.messaging.sendCloseSecondWindowEvent("closeall")
   })

 }
};

n(function() {
   ipc.messaging.init();
})

}(jQuery);
addCustomElementNavBar();