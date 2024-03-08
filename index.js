class Window {
  constructor(width, height, x, y) {
    if(x == undefined) this.x = window.innerWidth/2;
    if(y == undefined) this.y = window.innerHeight/2;
    this.x = x;
    this.y = y;
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
    this.windowElement.textContent = 'New Window';
    this.windowElement.classList.add("draggable");
    this.windowElement.classList.add("window");

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
  }

  createIcon() {

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

var myWindow = new Window(300, 300);
