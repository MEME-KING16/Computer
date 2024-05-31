function runtext(cont,name,path) {
    Computer.addToRam(new Window("texteditor"))
    document.getElementById(Computer.ram[Computer.ram.length - 1].headid).innerHTML = `<button onclick="interpreter.evaluate(interpreter.parse('call close ${Computer.ram[Computer.ram.length - 1].process}'))">Close</button>` 
    document.getElementById(Computer.ram[Computer.ram.length - 1].bodyid).innerHTML = `<textarea id="text${Computer.ram[Computer.ram.length - 1].process}"></textarea><button onclick="savetexteditor(${Computer.ram[Computer.ram.length - 1].process},'${name}','${path}')">Save</button>` 
    document.getElementById("text"+Computer.ram[Computer.ram.length - 1].process).value = cont
}

addAction("txt",(contents,name,path) => runtext(contents,name,path))

function savetexteditor(id,name,path) {
    findFile(path.split(","),name).contents = document.getElementById("text"+id).value
}
