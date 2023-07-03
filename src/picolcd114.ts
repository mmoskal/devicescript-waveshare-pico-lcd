import { startGamepad } from "@devicescript/servers"
import { spi } from "@devicescript/spi"
import { pins } from "@dsboard/pico_w"
import * as ds from "@devicescript/core"
import { ST7789Driver } from "@devicescript/drivers"
import { Image } from "@devicescript/graphics"

/**
 * Driver for WaveShare Pico-LCD-1.14 inch.
 * 
 * @see https://www.waveshare.com/pico-lcd-1.14.htm
 * @devsWhenUsed only start services which are used!
 */
export class WaveSharePicoLCD114 {
    constructor() {}

    startGamepad() {
        return startGamepad({
            pinA: pins.P15,
            pinB: pins.P17,
            pinDown: pins.P18,
            pinLeft: pins.P16,
            pinSelect: pins.P3, // middle
            pinRight: pins.P20,
            pinUp: pins.P2,
        })
    }

    async startDisplay() {
        spi.configure({
            mosi: pins.P11,
            sck: pins.P10,
            hz: 8_000_000,
        })

        pins.P13.setMode(ds.GPIOMode.OutputHigh) // BL

        const d = new ST7789Driver(Image.alloc(240, 136, 4), {
            dc: pins.P8,
            cs: pins.P9,
            reset: pins.P12,
            // frmctr1: 0x0e_14_ff,
            flip: false,
            spi: spi,
            offX: 40,
            offY: 53,
        })
        await d.init()
        return d
    }
}
