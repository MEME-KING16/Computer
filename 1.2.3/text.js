function runtext(cont,name,path) {
    Computer.addToRam(new Window("texteditor"))
    document.getElementById(Computer.ram[Computer.ram.length - 1].headid).innerHTML = `<button onclick="interpreter.evaluate(interpreter.parse('call close ${Computer.ram[Computer.ram.length - 1].process}'))">Close</button>` 
    document.getElementById(Computer.ram[Computer.ram.length - 1].bodyid).innerHTML = `<textarea ${Computer.settings.text.autoSave ? `onchange="savetexteditor(${Computer.ram[Computer.ram.length - 1].process},'${name}','${path}')"` : ``} id="text${Computer.ram[Computer.ram.length - 1].process}"></textarea><button onclick="savetexteditor(${Computer.ram[Computer.ram.length - 1].process},'${name}','${path}')">Save</button>` 
    document.getElementById("text"+Computer.ram[Computer.ram.length - 1].process).value = cont
}

addAction("txt",(contents,name,path) => runtext(contents,name,path))

function savetexteditor(id,name,path) {
    findFile(path.split(","),name).contents = document.getElementById("text"+id).value
    if(path == ["COMPUTER","system"] && name == "Settings") {
        Computer.settings = JSON.parse(document.getElementById("text"+id).value)
        document.body.style.backgroundColor = JSON.parse(document.getElementById("text"+id).value).system.backgroundColor
        document.body.style.fontSize = JSON.parse(document.getElementById("text"+id).value).system.fontSize
        document.body.style.color = JSON.parse(document.getElementById("text"+id).value).system.fontColor
        if(confirm("Computer needs to restart for some settings to work as expected. Do you want to restart?")) {
            Computer.saveState()
            location.reload()
        } else {
            if(confirm("issues may arise are you sure. Click ok to restart")) {
                Computer.saveState()
                location.reload()
            } else {
                alert("We are not liable for any issuse that arise")
            }
        }
        
    }
    Computer.saveState()
}
