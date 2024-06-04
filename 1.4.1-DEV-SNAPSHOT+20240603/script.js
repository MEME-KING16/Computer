//init computer required files
if (newin) {
Computer.saddFolder(new Folder("COMPUTER"))
Computer.saddFolder(new Folder("Program Files"))
Computer.storage[0].saddFolder(new Folder("system"))
Computer.storage[1].saddFolder(new Folder("Browser"))
Computer.storage[1].contents[0].saddFile(new File("browser","exe","start browser"))
Computer.storage[0].contents[0].saddFile(new File("Settings","txt",JSON.stringify({
    fm:{
        "showfileextention":true
    },
    text:{
        "autoSave":false
    },
    system: {
        "backgroundColor":"white",
        "fontSize":"16px",
        "fontColor":"black",
    }
})))

Computer.storage[1].saddFile(new File("File Manager", "exe", "call js startfm()"))
Computer.storage[1].saddFile(new File("To Be Added", "exe", "call js tobeadded()"))
//Computer.storage[1].saddFile(new File("settings","exe","call js console.log('nothing yet...')"))
}
function tobeadded() {
    let list = ["Delete function for the file manager","Customizable taskbar"]
    let flist = ""
    for (let index = 0; index < list.length; index++) {
        flist += `• ${list[index]}\n`;      
    }
    alert(flist)
}
document.body.innerHTML += `<div id="customMenu" class="context-menu">
<ul>
    <li id="addfile">Add File</li>
    <li id="addfolder">Add Folder</li>
    <li id="option3">Option 3</li>
</ul>
</div>`
document.body.innerHTML += `<div id="tbMenu" class="context-menu">
<ul>
    <li id="addfile">Add File</li>
    <li id="addfolder">Add Folder</li>
    <li id="option3">Option 3</li>
</ul>
</div>`
if(newin) {
initGameFiles();
localStorage.setItem("Computer",JSON.stringify({totalram:Computer.totalram,totalstorage:Computer.totalstorage,storageuse:Computer.storageuse,storage:Computer.storage,version:Computer.version}))
}
document.body.innerHTML += `<div id="taskbar"><button id="tb" title="<Start_Button>">Start</button><button id="tbi" title="<File_Manager>" onclick="interpreter.evaluate(interpreter.parse('call js startfm()'))"><i class="fa-regular fa-file"></i></button></div>`

const tbMenu = document.getElementById('tbMenu');

document.getElementById("taskbar").addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const { clientX: mouseX, clientY: mouseY } = e;
    tbMenu.style.top = `${mouseY}px`;
    tbMenu.style.left = `${mouseX}px`;
    tbMenu.style.display = 'block';
});



tbMenu.addEventListener('click', (e) => {
    if (e.target.id == "addfile") {

        let ans = prompt("File id")
        console.log(findFileById(ans))
        document.getElementById("taskbar").innerHTML+= `<button id="tbi" title="<${findFileById(ans).name}>" onclick="findFileById(${ans}).open()"><i class="fa-regular fa-file"></i></button>`
    }
    tbMenu.style.display = 'none';
});
