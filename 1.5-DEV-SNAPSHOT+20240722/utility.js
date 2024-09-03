function getsize(obj) {
    let jsonString = ''
    for (let index = 0; index < obj.length; index++) {
jsonString += obj[index]        
    }
    // Assuming 16-bit characters in JavaScript strings, 2 bytes per character
    return new Blob([jsonString]).size;
}
function findFileById(id) {
    function searchFolder(currentPath) {
        let storage = listContents(currentPath);
        for (let index = 0; index < storage.length; index++) {
            const item = storage[index];
            if (item instanceof File && item.id == id) {
                return item;
            } else if (item instanceof Folder) {
                const result = searchFolder([...currentPath, item.name]);
                if (result) {
                    return result;
                }
            }
        }
        return null; // If the file is not found
    }

    return searchFolder([]);
}


function findFolderById(id) {
    function searchFolder(currentPath) {
        let storage = listContents(currentPath);
        for (let index = 0; index < storage.length; index++) {
            const item = storage[index];
            if (item instanceof Folder && item.id == id) {
                return item;
            } else if (item instanceof Folder) {
                const result = searchFolder([...currentPath, item.name]);
                if (result) {
                    return result;
                }
            }
        }
        return null; // If the file is not found
    }

    return searchFolder([]);
}

function findFilePathById(id) {
    function searchFolder(currentPath) {
        let storage = listContents(currentPath);
        for (let index = 0; index < storage.length; index++) {
            const item = storage[index];
            if (item instanceof File && item.id == id) {
                return [item, currentPath];
            } else if (item instanceof Folder) {
                const result = searchFolder([...currentPath, item.name]);
                if (result) {
                    return result;
                }
            }
        }
        return null; // If the file is not found
    }

    return searchFolder([]);
}

function findFolderPathById(id) {
    function searchFolder(currentPath) {
        let storage = listContents(currentPath);
        for (let index = 0; index < storage.length; index++) {
            const item = storage[index];
            if (item instanceof Folder && item.id == id) {
                return [item, currentPath];
            } else if (item instanceof Folder) {
                const result = searchFolder([...currentPath, item.name]);
                if (result) {
                    return result;
                }
            }
        }
        return null; // If the folder is not found
    }

    return searchFolder([]);
}

function removeindexes(array,keep) {
    let returna = []
    for (let index = 0; index < keep; index++) {
        returna.push(array[index])
    }
    return returna
}


function arrayToJsonPath(array) {
    let path = 'Computer.storage';
    for (let index = 0; index < array.length; index++) {
        path += `[${listContents(removeindexes(array, index)).findIndex(item => item.name === array[index])}].contents`;
    }
    return path;
}

function deleteFileById(id) {
    const result = findFilePathById(id);
    if (result) {
        const [fileToDelete, filePath] = result;
        const parentPath = filePath;
        const parentFolderContents = arrayToJsonPath(parentPath);
        // Construct the path to the folder array
        const folderContents = eval(parentFolderContents);

        // Find the index of the file to delete
        const indexToDelete = folderContents.findIndex(item => item.id === fileToDelete.id);

        // Delete the file if the index is valid
        if (indexToDelete !== -1) {
            eval(`${parentFolderContents}.splice(${indexToDelete}, 1)`);
            Computer.saveState()
        } else {
            console.log("File not found.");
        }
    } else {
        console.log("File path not found.");
    }
}

function deleteFolderById(id) {
    const result = findFolderPathById(id);
    if (result) {
        const [fileToDelete, filePath] = result;
        const parentPath = filePath;
        const parentFolderContents = arrayToJsonPath(parentPath);

        // Construct the path to the folder array
        const folderContents = eval(parentFolderContents);

        // Find the index of the file to delete
        const indexToDelete = folderContents.findIndex(item => item.id === fileToDelete.id);

        // Delete the file if the index is valid
        if (indexToDelete !== -1) {
            eval(`${parentFolderContents}.splice(${indexToDelete}, 1)`);
            Computer.saveState()
        } else {
            console.log("Folder not found.");
        }
    } else {
        console.log("Folder path not found.");
    }
}

function getimgfrombin(bin) {
    let decodedimg = bin
    for (let index = 0; index < bin.length; index++) {
        for (let i = 0; i < bin[index].length; i++) {
            decodedimg[index][i] = bin[index][i] == 0 ? "black" : "white"            
        }
        
    }
    return decodedimg   
}

function getbinfromimg(img) {
    let encodedimg = img
    for (let index = 0; index < img.length; index++) {
        for (let i = 0; i < img[index].length; i++) {
            encodedimg[index][i] = img[index][i] == "black" ? 0 : 1            
        }
        
    }
    return encodedimg   
}

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  

function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for(i = 0, l = d2; i < l; i++) {
        arr[i] = new Array(d1);
    }
    return arr;
}

function updateimg() {
    for (let i = 0; i < Computer.ram.length; i++) {
        if(Computer.ram[i] instanceof Window && Computer.ram[i].name == "IMG") {
            const canvas = document.getElementById('colorCanvas'+Computer.ram[i].process);
            const colorArray = Computer.ram[i].imgdata[0][0] == "white" || Computer.ram[i].imgdata[0][0] == "black" ? Computer.ram[i].imgdata : getimgfrombin(Computer.ram[i].imgdata)
            const ctx = canvas.getContext('2d');
            
            const rows = colorArray.length;
            const cols = colorArray[0].length;
            const cellWidth = canvas.width / cols;
            const cellHeight = canvas.height / rows;
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    ctx.fillStyle = colorArray[row][col];
                    ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
                }
            }
        }
    }

}

function splitString(str,size) {
    const result = [];
    for (let i = 0; i < str.length; i += size) {
        result.push(str.slice(i, i + size));
    }
    return result;
}


function toSquare2DArray(flatArray) {
    // Calculate the side length of the square array
    const sideLength = Math.ceil(Math.sqrt(flatArray.length));
    const totalElements = sideLength * sideLength;

    // Pad the flat array with null values if necessary
    const paddedArray = flatArray.concat(new Array(totalElements - flatArray.length).fill(null));

    const result = [];
    for (let i = 0; i < paddedArray.length; i += sideLength) {
        result.push(paddedArray.slice(i, i + sideLength));
    }
    return result;
}


function binaryStringToUint8Array(binStr) {
    // Calculate the length of the Uint8Array
    const arrayLength = Math.ceil(binStr.length / 8);

    // Create a new Uint8Array
    const uint8Array = new Uint8Array(arrayLength);

    // Iterate over the binary string and convert each chunk of 8 bits to an integer
    for (let i = 0; i < arrayLength; i++) {
        const start = i * 8;
        const end = start + 8;
        const byteString = binStr.slice(start, end);
        uint8Array[i] = parseInt(byteString, 2);
    }

    return uint8Array;
}
