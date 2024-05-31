const fileactions = new Map([
    ["exe", (contents) => interpreter.evaluate(interpreter.parse(contents))]
    // Initialize with default action for "exe"
]);
function addAction(type, action) {
    fileactions.set(type, action);
}
class File {
    constructor(name,type,contents) {
        this.name = name
        this.type = type
        this.contents = contents
    }

    size() {
        return getsize(this.contents)
    }

    open(path) {
        const action = fileactions.get(this.type);
        if (action) {
            action(this.contents,this.name,path);
        } else {
            console.log("No action defined for this type.");
        }
    }
}

class Folder {
    constructor(name) {
        this.name = name
        this.contents = []
    }
    addFile(file) {
        this.contents.push(file)
        Computer.storageuse += file.size()
        updatefm()
    }

    addFolder(folder) {
        this.contents.push(folder)
        updatefm()
    }

    saddFile(file) {
        this.contents.push(file)
        Computer.storageuse += file.size()
    }

    saddFolder(folder) {
        this.contents.push(folder)
    }
}