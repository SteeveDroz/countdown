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
    data.start = false

    data.canvas.width = data.canvas.height = 500
}

const update = data => {
    data.startAngle = timeToAngle(data.endTime)
}

const render = data => {
    const {
        canvas,
        ctx,
        startAngle,
        start
    } = data

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (start) {
        let angle = Math.abs(startAngle)

        ctx.save()

        if (startAngle > 0) {
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(-Math.PI / 2)
            ctx.scale(1, -1)
            ctx.translate(-canvas.width / 2, -canvas.height / 2)
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'
        } else {
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(-Math.PI / 2)
            ctx.translate(-canvas.width / 2, -canvas.height / 2)
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
        }

        while (angle > 2 * Math.PI) {
            ctx.beginPath()
            ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2, 0, 2 * Math.PI)
            ctx.fill()

            angle -= 2 * Math.PI
        }

        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2, 0, angle)
        ctx.lineTo(canvas.width / 2, canvas.height / 2)
        ctx.fill()

        ctx.restore()
    }
}

const start = data => {
    let hours = document.querySelector('#hours').value
    let minutes = document.querySelector('#minutes').value
    let seconds = document.querySelector('#seconds').value
    if (hours.trim() == '') hours = 0
    if (minutes.trim() == '') minutes = 0
    if (seconds.trim() == '') seconds = 0

    data.endTime = Date.now() + 3600000 * hours + 60000 * minutes + 1000 * seconds

    data.start = true
}

const timeToAngle = endTime => {
    const difference = endTime - Date.now()
    return difference / 3600000 * 2 * Math.PI
}

load()
