import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PLAN_MAP = {
  basic: 199,
  pro: 499,
  enterprise: 1499
};

export default function Checkout(){
  const { planId } = useParams();
  const amount = PLAN_MAP[planId] ?? 199;
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try{
      setLoading(true);
      // 1) create order on server
      const res = await fetch('http://localhost:5000/api/payment/order', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ amount })
      });
      if(!res.ok) throw new Error('Order create failed');
      const order = await res.json();

      // 2) configure Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxx',
        amount: order.amount,
        currency: order.currency,
        name: 'SmartPayments',
        description: `${planId} plan`,
        order_id: order.orderId,
        handler: async function (response) {
          // 3) verify payment at server
          const verify = await fetch('http://localhost:5000/api/payment/verify', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(response)
          });
          const json = await verify.json();
          if(json.success) {
            window.location.href = '/success';
          } else {
            alert('Verification failed');
          }
        },
        modal: { ondismiss: ()=>{ console.log('dismissed'); } }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }catch(err){
      console.error(err);
      alert(err.message || 'Payment error');
    }finally{ setLoading(false); }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg mx-auto">
      <h1 className="text-xl font-semibold">Checkout — {planId}</h1>
      <p className="mt-4">Amount: <span className="font-bold">₹{amount}</span></p>
      <button
        onClick={handlePay}
        disabled={loading}
        className="mt-6 bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </div>
  );
}
