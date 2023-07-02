import * as ds from "@devicescript/core"
import { WaveSharePicoLCD114 } from "./picolcd114"

// not testing in sim
if (ds.isSimulator()) ds.restart()

const board = new WaveSharePicoLCD114()

const gp = board.startGamepad()
const disp = await board.startDisplay()

for (let i = 1; i < 15; ++i)
    disp.image.print(`Hello world c=${i}`, 2, i * 10 - 8, i)
await disp.show()

gp.change.subscribe(btns => {
    if (btns & ds.GamepadButtons.Down) {
        // ...
    }
})
