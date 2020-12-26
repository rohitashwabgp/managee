class Credentials extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ` <h3>Manage Credentials</h3>  <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-8">
        <div style=" border: 2px solid #34495E; margin-bottom:5px;">
        <p style="color:#34495E;margin-left:5px;font-size:24px;font-weight:strong">Add New</p>
        <form class="form-inline" id="credform">
        <input type="input" class="form-control m-2" id="accounttype" name="accounttype" placeholder="Account/Name"/>
        <input type="input" class="form-control m-2" id="username" name="username" placeholder="Username"/>
        <input type="input" class="form-control m-2" id="password" name="password" placeholder="Password"/>
        <input type="input" class="form-control m-2" id="comments" name="comments" placeholder="Comments"/>
        <input type="date" class="form-control m-2" id="lastmodified" name="lastmodified" placeholder="Last Modified"/>
        <input type="input" class="form-control m-2" id="lastPassword" name="lastPassword" placeholder="Last Password"/>
        <span class="material-icons form-group m-2" style="'font-size':'40px'" onclick="submitForm()">
        playlist_add
        </span>
        </form>
        </div>
        </div>
        <div class="col-xs-6 col-md-4">     
        <button id="cred-button" class="manage-button-danger"  style="float:right;right:0px">Delete</button></div>
         </div>
         </div>
        <table id="managecredentials" class="display" width="100%"></table>`
    }
}

function addCustomElementCredentials() {
    customElements.define("app-credentials", Credentials); 
    var dataSet = fs.readFileSync(path.join(__dirname,"extraResources","credentials.json"),{encoding:"utf-8"});
    $(document).ready(function() {
        $('#managecredentials').DataTable( {
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
            ],
            data: JSON.parse(dataSet).data,
            sScrollY : "390",
            sPaginationType : "full_numbers",
            columns: [
                { title: "Name/Account" },
                { title: "Username" },
                { title: "password" },
                { title: "Link/Comments" },
                { title: "Date Last Updated" },
                { title: "Last Passwords" }
            ]
        } );
    } );

    $(document).ready(function() {
        var table = $('#managecredentials').DataTable();
        $('#managecredentials tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        } );
        $('#cred-button').click( function () {
            var dataSet = fs.readFileSync(
                path.join(__dirname, "extraResources", "credentials.json"),
                { encoding: "utf-8" }
              );
               dataSet = JSON.parse(dataSet);
               let item = table.row('.selected').data();
               dataSet.data.forEach((cred,index)=>{
                if(cred[2] === item[2] && cred[4]===item[4]) {
                  dataSet.data.splice(index, 1);
                }
            })
              fs.writeFileSync(path.join(__dirname, "extraResources", "credentials.json"),JSON.stringify(dataSet), { encoding: "utf-8" } );
              let datatable = $("#managecredentials").DataTable();
              datatable.clear();
              datatable.rows.add(dataSet.data);
              datatable.draw(true);
                table.row('.selected').remove().draw( false );
        } );
    } );
}
function submitForm() {
    let form = document.getElementById("credform");
    var isAddNew= true;
    let cred_new = [
      form.elements["accounttype"].value,
      form.elements["username"].value,
      form.elements["password"].value,
      form.elements["comments"].value,
      form.elements["lastmodified"].value,
      form.elements["lastPassword"].value,
    ];
  
    var dataSet = fs.readFileSync(
      path.join(__dirname, "extraResources", "credentials.json"),
      { encoding: "utf-8" }
    );
     dataSet = JSON.parse(dataSet)
     dataSet.data.forEach(cred=>{
         if(cred[2] === cred_new[2] && cred[4]===cred_new[4]) {
          cred = cred_new;
          isAddNew= false;
         }
     })
     if(isAddNew && cred_new[2] && cred_new[4]) {
      dataSet.data.push(cred_new);
     }
    fs.writeFileSync(path.join(__dirname, "extraResources", "credentials.json"),JSON.stringify(dataSet), { encoding: "utf-8" } );
      let datatable = $("#managecredentials").DataTable();
      datatable.clear();
      datatable.rows.add(dataSet.data);
      datatable.draw(true);
  }
addCustomElementCredentials();