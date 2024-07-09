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

