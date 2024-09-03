function runtext(cont,name,path) {
    Computer.addToRam(new Window("texteditor"))
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
        document.body.style.backgroundImage = `url('${JSON.parse(document.getElementById("text"+id).value).system.backgroundImage}')`;
    }
    Computer.saveState()
}
