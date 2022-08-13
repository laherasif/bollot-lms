import Pusher from 'pusher-js'

export const pusher = new Pusher("592986acf446d24c4776", {
    cluster: 'mt1',
    forceTLS :true 
    
  });