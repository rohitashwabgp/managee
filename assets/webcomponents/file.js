class Files extends HTMLElement { // (1)
    connectedCallback() {
        this.innerHTML = ` <h3>Manage Files</h3> <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-8">
        <div style=" border: 2px solid #34495E; margin-bottom:5px;">
        <p style="color:#34495E;margin-left:5px;font-size:24px;font-weight:strong">Add New</p> <form>
        <div class="form-group">
          <label for="exampleFormControlFile1">Example file input</label>
          <input type="file" class="form-control-file" id="exampleFormControlFile1">
        </div>
      </form>
      </div>
      </div>
      </div>`
    }
}


function addCustomElementfiles() {
    customElements.define("app-files", Files); 

}

addCustomElementfiles();