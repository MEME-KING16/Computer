const Tabs = []
class Tab {
    constructor(url) {
        Computer.addToRam(url)
        Tabs.push(this)
    }
}