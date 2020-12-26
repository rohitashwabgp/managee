const fs = require("fs");

const path = require("path");
class BillPayments extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <h3>Manage Bills</h3>
    <div class="row">
  <div class="col-xs-12 col-sm-6 col-md-8">
  <div style=" border: 2px solid #34495E; margin-bottom:5px;">
  <p style="color:#34495E;margin-left:5px;font-size:24px;font-weight:strong">Add New</p>
  <form class="form-inline" id="billform">
  <input type="input" class="form-control m-2" id="authtype" name="authtype" placeholder="Name/Type"/>
    <select class="form-control" id="status">
      <option>Paid</option>
      <option>Not Paid</option>
      <option>Conflict</option>
    </select>
  <input type="input" class="form-control m-2" id="reference" name="reference" placeholder="ReferenceNo."/>
  <input type="input" class="form-control m-2" id="comments" name="comments" placeholder="Comments"/>
  <input type="date" class="form-control m-2" id="datePaid" name="datePaid" placeholder="Date Paid"/>
  <input type="number" class="form-control m-2" id="amount" name="amount" placeholder="Amount"/>
  <span class="material-icons form-group m-2" style="'font-size':'40px'" onclick="submitFormBills()">
  playlist_add
  </span>
  </form></div></div>
  <div class="col-xs-6 col-md-4">  
  <button id="bill-button-update" class="manage-button" style="float:right;margin-right:10px;">Update Status</button>  
  <button id="bill-button" class="manage-button-danger" style="float:right;">Delete</button></div>
  </div>
  <table id="managebill" class="display" width="100%" height="50%"></table>`;
  }
}

function addCustomElementBillPayments() {
  customElements.define("app-bill-payments", BillPayments);
  var dataSet = fs.readFileSync(
    path.join(__dirname, "extraResources", "manage.json"),
    { encoding: "utf-8" }
  );
  $(document).ready(function () {
    $("#managebill").DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
      sScrollY: "390",
      sPaginationType: "full_numbers",
      data: JSON.parse(dataSet).data,
      columns: [
        { title: "Name/Type" },
        { title: "Status" },
        { title: "Comments" },
        { title: "ReferenceNo." },
        { title: "Date Paid" },
        { title: "Amount" },
      ],
    });
  });

  $(document).ready(function() {
    var table = $('#managebill').DataTable();
 
    $('#managebill tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
    $('#bill-button').click( function () {
      var dataSet = fs.readFileSync(
        path.join(__dirname, "extraResources", "manage.json"),
        { encoding: "utf-8" }
      );
       dataSet = JSON.parse(dataSet);
       let item = table.row('.selected').data();
       dataSet.data.forEach((bill,index)=>{
        if(bill[2] === item[2] && bill[4]===item[4]) {
          dataSet.data.splice(index, 1);
        }
    })
      fs.writeFileSync(path.join(__dirname, "extraResources", "manage.json"),JSON.stringify(dataSet), { encoding: "utf-8" } );
      let datatable = $("#managebill").DataTable();
      datatable.clear();
      datatable.rows.add(dataSet.data);
      datatable.draw(true);
        table.row('.selected').remove().draw( false );
    } );
    $('#bill-button-update').click( function () {
      var dataSet = fs.readFileSync(
        path.join(__dirname, "extraResources", "manage.json"),
        { encoding: "utf-8" }
      );
       dataSet = JSON.parse(dataSet);
       let item = table.row('.selected').data();
       dataSet.data.forEach((bill,index)=>{
        if(bill[2] === item[2] && bill[4]===item[4]) {
          if(bill[1]==="Paid") {
            bill[1]="Not Paid"
          } else if(bill[1]==="Not Paid") {
            bill[1]="Conflict"
          } else {
            bill[1]="Paid"
          }
        }
    })
      fs.writeFileSync(path.join(__dirname, "extraResources", "manage.json"),JSON.stringify(dataSet), { encoding: "utf-8" } );
      let datatable = $("#managebill").DataTable();
      datatable.clear();
      datatable.rows.add(dataSet.data);
      datatable.draw(true);
        table.row('.selected').remove().draw( false );
    } );
} );
}

function submitFormBills() {
  let form = document.getElementById("billform");
  var isAddNew= true;
  let bill_new = [
    form.elements["authtype"].value,
    form.elements["status"].value,
    form.elements["reference"].value,
    form.elements["comments"].value,
    form.elements["datePaid"].value,
    form.elements["amount"].value,
  ];

  var dataSet = fs.readFileSync(
    path.join(__dirname, "extraResources", "manage.json"),
    { encoding: "utf-8" }
  );
   dataSet = JSON.parse(dataSet)
   dataSet.data.forEach(bill=>{
       if(bill[2] === bill_new[2] && bill[4]===bill_new[4]) {
        bill = bill_new;
        isAddNew= false;
       }
   })
   if(isAddNew &&  bill_new[2] && bill_new[4]) {
    dataSet.data.push(bill_new);
   }
  fs.writeFileSync(path.join(__dirname, "extraResources", "manage.json"),JSON.stringify(dataSet), { encoding: "utf-8" } );
    let datatable = $("#managebill").DataTable();
    datatable.clear();
    datatable.rows.add(dataSet.data);
    datatable.draw(true);
}

addCustomElementBillPayments();
