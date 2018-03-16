'use strict'

const load = () => {
    const data = {}

    init(data)

    setInterval(() => {
        update(data)
        render(data)
    }, 1000 / 60)

    document.querySelector('#start').onclick = event => {
        start(data)
    }
}

const init = data => {
    data.canvas = document.querySelector('#countdown')
    data.ctx = data.canvas.getContext('2d')

    data.endTime = Date.now()

    data.canvas.width = data.canvas.height = 300
}

const update = data => {
    data.startAngle = timeToAngle(data.endTime)
}

const render = data => {
    const {
        canvas,
        ctx,
        startAngle
    } = data

    ctx.fillStyle = '#eee'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    let angle = startAngle
    while (angle > 2 * Math.PI) {
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2, 0, 2 * Math.PI)
        ctx.fill()

        angle -= 2 * Math.PI
    }
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2, -Math.PI / 2 - angle, -Math.PI / 2)
    ctx.lineTo(canvas.width / 2, canvas.height / 2)
    ctx.fill()
}

const start = data => {
    const hours = document.querySelector('#hours').value
    const minutes = document.querySelector('#minutes').value
    const seconds = document.querySelector('#seconds').value

    data.endTime = Date.now() + 3600000 * hours + 60000 * minutes + 1000 * seconds
}

const timeToAngle = endTime => {
    const difference = endTime - Date.now()
    return difference / 3600000 * 2 * Math.PI
}

load()
