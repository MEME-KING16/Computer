function initGameFiles() {
Computer.storage[1].saddFolder(new Folder("Game"))
Computer.storage[1].contents[3].saddFile(new File("Game","exe","call js runGame()"))
}
function runGame() {
    Computer.addToRam(new Window("Game"))
    document.getElementById(Computer.ram[Computer.ram.length-1].bodyid).innerHTML = "GAME Coming Soon..."
}