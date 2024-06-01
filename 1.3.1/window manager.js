function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id).classList.add("move")
      document.getElementById(elmnt.id + "header").classList.add("movehead")
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  class Window {
    static processamt = 0
    constructor(name) {
        this.name = name
        this.process = Window.processamt
        this.headid = `${this.name}${this.process}header`
        this.bodyid = `${this.name}${this.process}body`
        this.id = `${this.name}${this.process}`
        Window.processamt = Window.processamt + 1
        document.body.innerHTML += `<div id="${this.process}"><div id="${this.name}${this.process}" style="border: 1px;"><div id="${this.name}${this.process}header"><button onclick="interpreter.evaluate(interpreter.parse('call close ${this.process}'))">Close</button></div><div id="${this.name}${this.process}body"></div></div></div>`
        dragElement(document.getElementById(`${this.name}${this.process}`))
        updatefm()
    }

    show() {
        document.getElementById(`${this.name}${this.process}`).style.display = "block"
    }

    hide() {
        document.getElementById(`${this.name}${this.process}`).style.display = "none"
    }

    remove() {
        document.getElementById(`${this.name}${this.process}`).remove()
    }
  }