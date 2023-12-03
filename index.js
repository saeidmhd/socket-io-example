const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('یک کلاینت به سرور متصل شد.');

    // ارسال نوتیفیکیشن به همه کلاینت‌ها
    socket.on('sendNotification', (message) => {
        io.emit('receiveNotification', message);
    });

    // قطع اتصال
    socket.on('disconnect', () => {
        console.log('یک کلاینت از سرور قطع شد.');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`سرور در حال اجرا در پورت ${PORT}`);
});
