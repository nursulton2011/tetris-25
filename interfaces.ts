export interface IShape {
    shape: number[][]
    color: string
}

export interface IShapes {
    T: IShape
    S: IShape
    Z: IShape
    I: IShape
    O: IShape
    J: IShape
    L: IShape
}

interface A {
    abc: string
}

interface A {
    xyz: number
}

const laptop: Laptop = {
    screen: {
        resolution: {
            width: 4096,
            height: 2156,
            fps: 120
        }, 
        brightness: 1200,
        manufacturer: 'Samsung'
    },

    cpu: {
        cores: 8,
        manufacturer: 'Intel'
    },

    ram: {
        memory: 16,
    },

    vram: {
        memory: 6
    }
}

const laptop2: NewLaptop = {
    screen: {
        resolution: {
            width: 4096,
            height: 2156,
            fps: 120
        }, 
        brightness: 1200,
        manufacturer: 'Samsung'
    },

    cpu: {
        cores: 8,
        manufacturer: 'Intel'
    },

    ram: {
        memory: 16,
        ddrGeneration: 4
    },

    vram: {
        memory: 6,
        algorithm: 'B'
    }
}

interface Laptop {
    screen: Screen
    cpu: CPU
    ram: Memory
    vram: Memory
}

interface NewLaptop extends Laptop{
    ram: RAM
    vram: VRAM
}

interface Screen {
    resolution: {
        width: number
        height: number
        fps: number
    }

    brightness: number
    manufacturer: string
}

interface CPU {
    cores: number
    manufacturer: string
}



interface Memory {
    memory: number
}

interface RAM extends Memory {
    ddrGeneration: number
}

interface VRAM extends Memory {
    algorithm: 'A' | 'B'
}

