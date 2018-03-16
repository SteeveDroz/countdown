'use strict'

const load = () => {
    const data = {}

    init(data)

    setInterval(() => {
        update(data)
        render(data)
    }, 1000 / 60)
}

const init = data => {
    data.canvas = document.querySelector('#countdown')
    data.ctx = data.canvas.getContext('2d')

    data.time.hours = 0
    data.time.minutes = 0
    data.time.seconds = 0

    data.canvas.width = data.canvas.height = 300
}

const update = data => {
}

const render = data => {
    const {
        canvas,
        ctx
    } = data

    ctx.fillStyle = '#eee'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}


load()
