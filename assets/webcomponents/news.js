class NewsElement extends HTMLElement { // (1)
    connectedCallback() {
        this.innerHTML = `<div class="news-container"><div class="row">
        <div class="column" onclick="openTab('b1');" style="background:green;">
          Box 1
        </div>
        <div class="column" onclick="openTab('b2');" style="background:blue;">
          Box 2
        </div>
        <div class="column" onclick="openTab('b3');" style="background:red;">
          Box 3
        </div>
      </div> 
      <div id="b1" class="containerTab" style="display:none;background:green">
        <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>
        <h2>Box 1</h2>
        <p>Lorem ipsum dolor sit amet, te quo doctus abhorreant, et pri deleniti intellegat, te sanctus inermis ullamcorper nam. Ius error diceret deseruisse ad</p>
      </div>
      
      <div id="b2" class="containerTab" style="display:none;background:blue">
        <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>
        <h2>Box 2</h2>
        <p>Lorem ipsum dolor sit amet, te quo doctus abhorreant, et pri deleniti intellegat, te sanctus inermis ullamcorper nam. Ius error diceret deseruisse ad</p>
      </div>
      
      <div id="b3" class="containerTab" style="display:none;background:red">
        <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>
        <h2>Box 3</h2>
        <p>Lorem ipsum dolor sit amet, te quo doctus abhorreant, et pri deleniti intellegat, te sanctus inermis ullamcorper nam. Ius error diceret deseruisse ad</p>
      </div>
      </div>`
    }
}


function addCustomElementNews() {
    customElements.define("app-news", NewsElement);
    console.log("news!");
  }
  addCustomElementNews();


function openTab(tabName) {
    var i, x;
    x = document.getElementsByClassName("containerTab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
  }