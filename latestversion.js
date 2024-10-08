const latestversion = "1.4.1";
const latestdevversion = "1.5-DEV-SNAPSHOT+20240902";
const patchnotes = {
    "1": [],
    "1.1": ["Added Computer saving"],
    "1.2": ["Added settings.txt in Computer/system", "Added autosave and show file extensions settings"],
    "1.2.1": ["Added more settings"],
    "1.2.2": ["Added functionality to new settings"],
    "1.2.3": ["Temp fixed issue where changing font size makes windows impossible to move better fix will be added in the future"],
    "1.3": ["Added taskbar with file manager more will be added in the future","Fixed an unknown issue where if you closed a file manager all new ones would break","Fixed issue where opening a text editor would remove the ability to drag file manager windows","Better fix for issue where changing font size makes windows impossible to move","Added dev mode"],
    "1.3.1": ["Added better looking windows","Added Background images","added langv2"],
    "1.4": ["Added ability to delete files/folders through console using the .delete() method"],
    "1.4.1": ["Added ability to add files to the taskbar by using their id","Made taskbar go all the way from one side to the other to make it easier to click","Fixed issue where the right click on the taskbar still stopped working after opening a window","Fixed rare issue where window would lose drag randomly","Revamped css","Made css version specific","Added Computer.loadCustomVersion so you can now load custom versions"]
};

let fullreleses = ["1","1.1","1.2","1.2.1","1.2.2","1.2.3","1.3","1.3.1","1.4","1.4.1"]
let allreleses = ["1","1.1","1.2","1.2.1","1.2.2","1.2.3","1.3","1.3.1","1.4","1.4.1-DEV-SNAPSHOT+20240603","1.4.1-DEV-SNAPSHOT+20240605","1.4.1-DEV-SNAPSHOT+20240606","1.4.1-DEV-SNAPSHOT+20240623","1.4.1-rc1","1.4.1","1.5-DEV-SNAPSHOT+20240902"]