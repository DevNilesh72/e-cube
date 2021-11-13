import htaccess from '../http-common'

class paymentService {
    makePayment(paymentObj){
        return htaccess().post('/order/makePayment',paymentObj);
    }

    bookTickets(screenId,ticketObj){
        return htaccess().post('/screens/book/'+screenId,ticketObj);
    }
}

export default new paymentService();