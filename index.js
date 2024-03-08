class Window {
  constructor(width, height, proc, x, y) {
    if (x == undefined) this.x = window.innerWidth / 2; else this.x = x;
    if(y == undefined) this.y = window.innerHeight/2; else this.y = y;
    this.proc = proc;
    this.width = width;
    this.height = height;
    this.createWindow();
  }

  createWindow() {
    // Create the main window element
    this.windowElement = document.createElement('div');
    this.windowElement.style.width = `${this.width}px`;
    this.windowElement.style.height = `${this.height}px`;
    this.windowElement.style.position = 'absolute';
    this.windowElement.style.top = `${this.y}px`;
    this.windowElement.style.left = `${this.x}px`;
    this.windowElement.style.backgroundColor = '#fff';
    this.windowElement.style.border = '1px solid #ccc';
    this.windowElement.style.zIndex = '10';
    this.windowElement.textContent = this.proc;
    this.windowElement.classList.add("draggable");
    this.windowElement.classList.add("window");
    this.windowElement.onmousedown = () => {focusOn(this.windowElement)}

    // Create the top navigation bar
    let navBar = document.createElement('div');
    navBar.style.width = '100%';
    navBar.style.height = '20px'; // Adjust height as needed
    navBar.style.backgroundColor = '#f1f1f1'; // Light grey background
    navBar.style.position = "absolute";
    navBar.style.top = "0";
    navBar.style.right = "0";

    // Create the close button
    let closeButton = document.createElement('button');
    closeButton.style.position = "absolute";
    closeButton.style.right = "0";
    closeButton.style.width = '20px';
    closeButton.style.height = '100%'; // Full height of the nav bar
    closeButton.style.backgroundColor = 'red';
    closeButton.textContent = 'X';
    closeButton.style.color = '#fff'; // White text
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
      this.windowElement.remove();
      procList.splice(procList.indexOf(this.proc), 1);
    });

    // Append the close button to the nav bar
    navBar.appendChild(closeButton);

    // Append the nav bar to the main window element
    this.windowElement.appendChild(navBar);

    // Append the main window element to the body
    document.body.appendChild(this.windowElement);

    // Make the window draggable
    makeDraggable();
  }
}

class TaskbarIcon {
  constructor(proc, text) {
    this.proc = proc;
    this.text = text;

    this.createIcon();
  }

  createIcon() {
    this.iconElement = document.createElement('div');
    this.iconElement.textContent = this.text;
    this.iconElement.classList.add("taskbarIcon");
    document.querySelector("#taskbar").appendChild(this.iconElement);
    this.iconElement.onclick = () => {openProc(this.proc)}
  }
}

/* make stuff draggable */
function makeDraggable() {
  $(".draggable").draggable({
    containment: "#desktop",
    scroll: false,
    drag: function (event, ui) {
      // Calculate half of the element's width and height
      var halfWidth = $(this).width() / 2;
      var halfHeight = $(this).height() / 2;

      // Adjust the position based on the calculated offsets
      ui.position.top += halfHeight;
      ui.position.left += halfWidth;
    }
  });
}
makeDraggable();

var procList = [];
var pidList = [];

function openProc(proc) {
  if(procList.includes(proc)) return;
  var procWin = new Window(300, 300, proc);
  let rnd = Math.floor(Math.random() * 9999 + 1000);
  if(!pidList.includes(rnd)) {
    pidList.push(rnd);
  } else {
    do {
      rnd++;
      if (!pidList.includes(rnd)) pidList.push(rnd);
    } while (!pidList.includes(rnd))
  }
  procList.push(proc);
}

function focusOn(el) {
  document.querySelectorAll(".window").forEach((d) => {
    d.style.zIndex = "10";
  });
  el.style.zIndex = "11";
}

var myIconc = new TaskbarIcon("c", "Cccccc");
var myIcon = new TaskbarIcon("e", "Eeeeeee");
