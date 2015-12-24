var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

// 서버에서 작성한 내용을 클라이언트로 멀티 캐스트
var is = process.stdin;

is.on('data', function(chunk) {
   var msg = chunk.toString();
   if ( msg.trim() == 'exit' ) {
      // 종료
      is.end();
      socket.close();
   }
   else {      
      socket.send(msg, 0, msg.length, 3000, '224.0.0.114', function(err) {
         if ( err ) {
            console.error('UDP Message send error.', err);   
            return;
         }         
         console.log('UDP Message Send success');
      });      
   }
});