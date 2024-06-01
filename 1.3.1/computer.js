class Computer {
    static crashed = false
    static totalram = 1024
    static totalstorage = 2048
    static storageuse = 0
    static ram = []
    static storage = []
    static version = latestversion
    static settings = {
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
    }
    static dev = false
    static addToRam(data) {
        if (!this.crashed) {
        this.ram.push(data)
        this.checkCrash()
        }
    }
    static addToStorage(data) {
        if (!this.crashed) {
            if (data instanceof File) {
                if (data.size() + this.storageuse <= this.totalstorage) {
        this.storage.push(data)
        this.checkCrash()
        this.storageuse += data.size()
                }
            } else {
                this.storage.push(data)
                this.checkCrash()
            }
            this.saveState()
        }
    }

    static checkCrash() {
        if (getsize(this.ram) > this.totalram) {
            this.crash()
        }
    }
    static crash() {
        console.log("THE PC CRASHED :(")
        this.crashed = true
    }
    static fillram() {
        for (let index = 0; index < this.totalram; index++) {
            this.addToRam('a')
            
        }
    }

    static clearram() {
        for (let index = 0; index < this.totalram; index++) {
            this.ram = []
            
        }
    }

    static addFile(file) {
        this.addToStorage(file)
        updatefm()
    }


    static addFolder(folder) {
        this.addToStorage(folder)
        updatefm()
    }

    static saddFile(file) {
        this.addToStorage(file)
    }

    static saddFolder(folder) {
        this.addToStorage(folder)
    }
    
    static taskmanager() {
        return [getsize(this.ram),getsize(this.storage)]
    }
    
    static saveState() {
        localStorage.setItem("Computer", JSON.stringify({
            totalram: this.totalram,
            totalstorage: this.totalstorage,
            storageuse: this.storageuse,
            storage: this.storage,
            version: this.version,
            settings: this.settings,
            dev: this.dev
        }));
    }
}

