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

    document.querySelector('#reset').onclick = event => {
        reset(data)
    }
}

const init = data => {
    data.canvas = document.querySelector('#countdown')
    data.ctx = data.canvas.getContext('2d')

    data.endTime = Date.now()
    data.start = false
    data.reset = false

    data.canvas.width = data.canvas.height = 500
}

const update = data => {
    if (data.start || data.reset) {
        data.startAngle = timeToAngle(data.endTime)
        data.reset = false
    }
    if (data.start) {
        let difference = Math.abs(Math.floor((data.endTime - Date.now()) / 1000))
        let seconds = pad(difference % 60, '00')
        difference = Math.floor(difference / 60)
        let minutes = pad(difference % 60, '00')
        difference = Math.floor(difference / 60)
        let hours = difference

        if (data.endTime < Date.now()) {
            if (hours != 0) {
                hours = -hours
            } else if (minutes != 0) {
                minutes = -minutes
            } else {
                seconds = -seconds
            }
        }

        document.querySelector('#hours').value = hours
        document.querySelector('#minutes').value = minutes
        document.querySelector('#seconds').value = seconds
    }
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

const start = data => {
    const button = document.querySelector('#start')
    if (data.start) {
        button.innerText = 'Start'
    } else {
        let hours = document.querySelector('#hours').value
        let minutes = document.querySelector('#minutes').value
        let seconds = document.querySelector('#seconds').value
        if (hours.trim() == '') hours = 0
        if (minutes.trim() == '') minutes = 0
        if (seconds.trim() == '') seconds = 0

        let sign
        if (hours != 0) {
            sign = hours < 0 ? -1 : 1
        } else if (minutes != 0) {
            sign = minutes < 0 ? -1 : 1
        } else {
            sign = seconds < 0 ? -1 : 1
        }

        minutes = sign * Math.abs(minutes)
        seconds = sign * Math.abs(seconds)

        data.endTime = Date.now() + 3600000 * hours + 60000 * minutes + 1000 * seconds

        button.innerText = 'Pause'
    }
    data.start ^= true
}

const reset = data => {
    data.endTime = Date.now()
    data.start = false
    document.querySelector('#hours').value = ''
    document.querySelector('#minutes').value = ''
    document.querySelector('#seconds').value = ''
    document.querySelector('#start').innerText = 'Start'
    data.reset = true
}

const timeToAngle = endTime => {
    const difference = endTime - Date.now()
    return difference / 3600000 * 2 * Math.PI
}

const pad = (value, format) => (format + value).slice(-format.length)

load()
