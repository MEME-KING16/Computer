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
    }
})))
Computer.storage[1].saddFile(new File("File Manager", "exe", "call js startfm()"))
//Computer.storage[1].saddFile(new File("settings","exe","call js console.log('nothing yet...')"))
}
document.body.innerHTML += `<div id="customMenu" class="context-menu">
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