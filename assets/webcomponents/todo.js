class TodoElement extends HTMLElement {
  // (1)
  connectedCallback() {
    this.innerHTML = `<div id="todolist" class="header">
		<h2 style="margin:5px">To Do List</h2>
		<input type="text" id="newtodo" placeholder="Title...">
		<span onclick="newElement()" class="addBtn">Add</span>
	  </div>
	  
	  <ul id="allitems">
	  </ul>`;
  }
}

function addCustomElementTodo() {
  customElements.define("app-todo", TodoElement); 
  updateList();
  var myNodelist = document
    .getElementById("routine")
    .getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementById("routine").getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
	  let allItems = fs.readFileSync(
		path.join(__dirname, "extraResources", "todo.json"),{ encoding: "utf-8" });
	  let completed = JSON.parse(allItems).completed;
	  let todo = JSON.parse(allItems).todo;
	  let item = div.innerText.trim();
	  item = item.replace(/\r?\n|\r/, '');
	  item = item.replace(/\u00D7/g,'').trim();
	  let index = todo.indexOf(item);
	  if (index > -1) {
		todo.splice(index, 1);
	  } else {
		index = completed.indexOf(item);
		completed.splice(index,1);
	  }	  
	  allItems = JSON.parse(allItems);
	  allItems.completed =completed;
	  allItems.todo = todo;
	  fs.writeFileSync(path.join(__dirname, "extraResources", "todo.json"),JSON.stringify(allItems),{ encoding: "utf-8" });
      div.style.display = "none";
    };
  }
  // Add a "checked" symbol when clicking on a list item
  var list = document.getElementById("routine").querySelector("ul");
  list.addEventListener("click", function (ev) {
      if (ev.target.tagName === "LI") {
		let allItems = fs.readFileSync(path.join(__dirname, "extraResources", "todo.json"),{ encoding: "utf-8" });
		  let completed = JSON.parse(allItems).completed;
          let todo = JSON.parse(allItems).todo;
          let item = ev.target.innerText.trim();
		  item = item.replace(/\r?\n|\r/, '');
		  item = item.replace(/\u00D7/g,'').trim();
          let index = todo.indexOf(item);
          if (index > -1) {
          todo.splice(index, 1);
		  completed.push(item);
          } else {
			index = completed.indexOf(item);
			completed.splice(index,1);
			todo.push(item);
		  }
		  allItems = JSON.parse(allItems);
		  allItems.completed =completed;
		  allItems.todo = todo;
		  fs.writeFileSync(path.join(__dirname, "extraResources", "todo.json"),JSON.stringify(allItems),{ encoding: "utf-8" });
          ev.target.classList.toggle("checked");
      }
    },false);
}

function updateList() {
  let allItems = fs.readFileSync(
    path.join(__dirname, "extraResources", "todo.json"),
    { encoding: "utf-8" }
  );
  let completed = JSON.parse(allItems).completed;
  let todo = JSON.parse(allItems).todo;

  for (i = 0; i < todo.length; i++) {
    var li = document.createElement("li");
    var t = document.createTextNode(todo[i]);
    li.appendChild(t);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    document.getElementById("allitems").appendChild(li);
  }
  for (i = 0; i < completed.length; i++) {
    var li = document.createElement("li");
    var t = document.createTextNode(completed[i]);
    li.appendChild(t);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    li.classList.toggle("checked");
    document.getElementById("allitems").appendChild(li);
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("newtodo").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
	let allItems = fs.readFileSync(
		path.join(__dirname, "extraResources", "todo.json"),
		{ encoding: "utf-8" }
	  );
	  let todo = JSON.parse(allItems).todo;
	  todo.push(inputValue);
    document.getElementById("allitems").appendChild(li);
  }
  document.getElementById("newtodo").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  var close = document.getElementById("routine").getElementsByClassName("close");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
    var div = this.parentElement;
	let allItems = fs.readFileSync(
		path.join(__dirname, "extraResources", "todo.json"),{ encoding: "utf-8" });
	  let completed = JSON.parse(allItems).completed;
	  let todo = JSON.parse(allItems).todo;
	  let item = div.innerText.trim();
	  item = item.replace(/\r?\n|\r/, '');
	  item = item.replace(/\u00D7/g,'').trim();
	  let index = todo.indexOf(item);
	  if (index > -1) {
		todo.splice(index, 1);
	  } else {
		index = completed.indexOf(item);
		completed.splice(index,1);
	  }	  
	  allItems = JSON.parse(allItems);
	  allItems.completed =completed;
	  allItems.todo = todo;
	  fs.writeFileSync(path.join(__dirname, "extraResources", "todo.json"),JSON.stringify(allItems),{ encoding: "utf-8" });
    div.style.display = "none";
    };
  }
}

addCustomElementTodo();
