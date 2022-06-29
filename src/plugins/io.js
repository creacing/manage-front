import ClientSocketIO from 'socket.io-client'
export default {
    install: (app, { connection, options }) => {
        const socket =  ClientSocketIO(connection, options)
        app.config.globalProperties.$socket = socket
        app.provide('socket', socket)
    }
}