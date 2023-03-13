function nextMenuItem() {
    if (menuSelected) return
    currentMenuItem = (currentMenuItem + 1) % menuItems.length
    showCurrentMenuItem()
}
function prevMenuItem() {
    if (menuSelected) return
    currentMenuItem = currentMenuItem - 1
    if (currentMenuItem < 0) currentMenuItem = menuItems.length-1
    showCurrentMenuItem()
}
function showCurrentMenuItem() {
    I2C_LCD1602.ShowString(getMenuItem(currentMenuItem), 0, 0)
}
function padRight(text: string, length: number) {
    const padLength = lcdDigits - text.length
    let padding = ''
    while (padding.length < padLength) {
        padding += ' '
    }
    return `${text}${padding}`
}
// e.g. 1/9:Propeller
function getMenuItem(i: number) {
    const text = `${i + 1}/${menuItems.length}:${menuItems[i]}`
    return padRight(text, lcdDigits)
}
// e.g. RUN:Propeller
function selectMenu(i: number) {
    const text = `RUN:${menuItems[i]}`
    I2C_LCD1602.ShowString(padRight(text, lcdDigits), 0, 0)
    menuSelected = true
}
let lcdDigits = 16
let currentMenuItem = 0
let menuItems: string[] = []
menuItems = [
    "Window",
    "Neopixels",
    "Propeller",
    "Steam sensor",
    "Temperature",
    "PIR sensor",
    "GAS sensor",
    "Door",
    "Battery"
]
// window
const window = AnalogPin.P9
let windowOpen = false
function closeWindow() {
    pins.servoWritePin(window, 0)
    windowOpen = false
}
function openWindow() {
    pins.servoWritePin(window, 180)
    windowOpen = true
}
function toggleWindow() {
    if (windowOpen) {
        closeWindow()
    } else {
        openWindow()
    }
}

// door
const door = AnalogPin.P10

// setup
basic.clearScreen()
I2C_LCD1602.LcdInit(39)
showCurrentMenuItem()
closeWindow()

// event handlers
let menuSelected = false
input.onLogoEvent(TouchButtonEvent.Touched, () => {
    if (menuSelected == false) {
        selectMenu(currentMenuItem)
        return
    }

    // window
    if (currentMenuItem == 0) {
        toggleWindow()
    }
})
input.onButtonPressed(Button.A, prevMenuItem)
input.onButtonPressed(Button.B, nextMenuItem)
// basic.forever(function () {
// })
