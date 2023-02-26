function getMenuItem (i: number) {
    return `${i + 1}/${menu.length}: ${menu[i]}`
}
I2C_LCD1602.LcdInit(39)
let menu = [
"Propeller",
"Steam sensor",
"Temperature",
"PIR sensor",
"GAS sensor",
"Door",
"Window",
"Neopixels",
"Solar charging"
]
basic.clearScreen()
basic.showString("Hello!")
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        basic.showIcon(IconNames.Heart)
    }
    if (input.buttonIsPressed(Button.B)) {
        basic.showIcon(IconNames.Skull)
    }
})
