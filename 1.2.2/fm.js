let fmpath = []
let fmids = []
document.addEventListener('click', () => {
    customMenu.style.display = 'none';
});
function startfm() {
    Computer.addToRam(new Window("filemanager"))
    Computer.ram[Computer.ram.length-1].path = []
    fmids.push(Computer.ram[Computer.ram.length-1].process)
const customMenu = document.getElementById('customMenu');
    for (let index = 0; index < fmids.length; index++) {
document.getElementById(Computer.ram[index].process).addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const { clientX: mouseX, clientY: mouseY } = e;
    customMenu.style.top = `${mouseY}px`;
    customMenu.style.left = `${mouseX}px`;
    customMenu.style.display = 'block';
});



customMenu.addEventListener('click', (e) => {
    if (e.target.id == "addfile") {
        if (Computer.ram[index].path.length == 0) {
            alert("You can't add files in the root directory!")
        } else {

        let ans = prompt("File Name").split(".")
        let fileextention = ans[ans.length-1]
        ans.pop()
        findFolder(Computer.ram[index].path.slice(0,-1),Computer.ram[index].path[Computer.ram[index].path.length-1]).addFile(new File(ans.join("."),fileextention,''))       
        }
    }
    if (e.target.id == "addfolder") {
        if (Computer.ram[index].path.length == 0) {
            alert("You can't add folders in the root directory!")
        } else {
        let ans = prompt("Folder Name")
        findFolder(Computer.ram[index].path.slice(0,-1),Computer.ram[index].path[Computer.ram[index].path.length-1]).addFolder(new Folder(ans))       
        }
    }
    customMenu.style.display = 'none';
});
    }
    updatefm()
}

function updatefm() {
    for (let i = 0; i < Computer.ram.length; i++) {
        if(Computer.ram[i] instanceof Window && Computer.ram[i].name == "filemanager") {

            document.getElementById(Computer.ram[i].bodyid).innerHTML = `<i class="fa-solid fa-arrow-left" onclick="Computer.ram[${i}].path.pop();updatefm()"></i><br>`
            for (let index = 0; index < listContents(Computer.ram[i].path).length; index++) {
                if(listContents(Computer.ram[i].path)[index] instanceof Folder)
                document.getElementById(Computer.ram[i].bodyid).innerHTML += `<span onclick="Computer.ram[${i}].path.push('${listContents(Computer.ram[i].path)[index].name}');updatefm();"><i class="fa-regular fa-folder"></i> `+listContents(Computer.ram[i].path)[index].name+"</span><br>"
                if(listContents(Computer.ram[i].path)[index] instanceof File) {
                    if(Computer.settings.fm.showfileextention) {
                    document.getElementById(Computer.ram[i].bodyid).innerHTML += `<span onclick="findFile('${Computer.ram[i].path.join(",")}','${listContents(Computer.ram[i].path)[index].name}','str').open('${Computer.ram[i].path.join(",")}')"><i class="fa-regular fa-file"></i> `+listContents(Computer.ram[i].path)[index].name + "." + listContents(Computer.ram[i].path)[index].type + "</span><br>"
                } else {
                    document.getElementById(Computer.ram[i].bodyid).innerHTML += `<span onclick="findFile('${Computer.ram[i].path.join(",")}','${listContents(Computer.ram[i].path)[index].name}','str').open('${Computer.ram[i].path.join(",")}')"><i class="fa-regular fa-file"></i> `+listContents(Computer.ram[i].path)[index].name + "</span><br>"
                }
            }
            }
            
        dragElement(document.getElementById(Computer.ram[i].id))
        }
    }

}

function listContents(path) {
    let returndata = []
    let currentFolder = Computer.storage;
    for (const folderName of path) {
        const foundFolder = currentFolder.find(item => item.name === folderName && item instanceof Folder);
        if (!foundFolder) {
            console.error("Folder not found:", folderName);
            return;
        }
        currentFolder = foundFolder.contents;
    }

    // Assuming you want to list these in a user-readable format
    currentFolder.forEach(item => {
        returndata.push(item)
    });
    return returndata
}


function findFile(path,name,str) {
    if (str) {
        let patha = path.split(",")
    let foundFolder = listContents(patha).find(item => item.name === name && item instanceof File);
        if (!foundFolder) {
            console.error("File not found:", name);
            return;
        }
    return foundFolder
    } else {
        let foundFolder = listContents(path).find(item => item.name === name && item instanceof File);
        if (!foundFolder) {
            console.error("File not found:", name);
            return;
        }
    return foundFolder
    }
    }

    function findFolder(path,name,str) {
        if (str) {
            let patha = path.split(",")
        let foundFolder = listContents(patha).find(item => item.name === name && item instanceof Folder);
            if (!foundFolder) {
                console.error("Folder not found:", name);
                return;
            }
        return foundFolder
        } else {
            let foundFolder = listContents(path).find(item => item.name === name && item instanceof Folder);
            if (!foundFolder) {
                console.error("Folder not found:", name);
                return;
            }
        return foundFolder
        }
        }
    