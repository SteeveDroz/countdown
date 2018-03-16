'use strict'

const load = () => {
    const data = {}

    init(data)

    setInterval(() => {
        update(data)
        render(data)
    }, 1000 / 60)
}

const init = data => {}
const update = data => {}
const render = data => {}

load()
