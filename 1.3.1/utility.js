function getsize(obj) {
    let jsonString = ''
    for (let index = 0; index < obj.length; index++) {
jsonString += obj[index]        
    }
    // Assuming 16-bit characters in JavaScript strings, 2 bytes per character
    return new Blob([jsonString]).size;
}

