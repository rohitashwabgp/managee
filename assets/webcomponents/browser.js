class BrowseElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="browser-container">
        <div class="row">
          <div class="column left">
            <span class="dot" style="background:#ED594A;"></span>
            <span class="dot" style="background:#FDD800;"></span>
            <span class="dot" style="background:#5AC05A;"></span>
          </div>
          <div class="column middle">
            <input type="text" value="http://www.google.com">
          </div>
          </div>
        <div class="content">
          <h3>Browser Window</h3>
          <p>How to create a detailed browser window look with CSS.</p>
      </div>`
    }
}


function addCustomElementBrowser() {
    customElements.define("app-browser", BrowseElement); // (2)
    console.log("Added MyElement to custom element registry!");
  }
  addCustomElementBrowser();
