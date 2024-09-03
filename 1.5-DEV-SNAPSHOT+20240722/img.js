function optimizebin(img) {
    img = img.flat().join("")
    let uint8img = binaryStringToUint8Array(img)
    return uint8img
    }
    
    function decodeimg(uint8Array) {
        let binimg = []
    for (let index = 0; index < uint8Array.length; index++) {
        binimg[index] = uint8Array[index].toString(2).padStart(8,"0")
    }
    binimg = toSquare2DArray(binimg.join(""))
    for (let index = 0; index < binimg.length; index++) {
        binimg[index] = binimg[index].split("")
        for (let i = 0; i < binimg[index].length; i++) {
            binimg[index][i] = Number(binimg[index][i])
            
        }
        
    }
    return binimg
    }
    
    //testing purposes
    function randomImg(height,width) {
    let img = makeArray(height,width)
    for (let index = 0; index < img.length; index++) {
        img[index];
        for (let i = 0; i < img[index].length; i++) {
            img[index][i];
            img[index][i] = randomInt(0,1);
        }
    }    
    return img
    }
    
    
    function makecanvasimg(colorArray) {
        Computer.ram.push(new Window("IMG"))
        Computer.ram[Computer.ram.length-1].imgdata = getbinfromimg(colorArray)
        let win = Computer.ram[Computer.ram.length-1]
        document.getElementById(win.bodyid).innerHTML += `<canvas id="colorCanvas${win.process}" width="200" height="200"></canvas>`
    updateimg()
    }

    
addAction("img",(contents) => makecanvasimg(contents))

