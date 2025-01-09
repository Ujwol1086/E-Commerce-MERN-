import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const [status, setStatus] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = searchParams.get("pidx");
      console.log(pidx);
      if (!pidx) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/payment/verify",
          {
            params: { pidx },
          }
        );
        setStatus(response.data.message);
      } catch (error) {
        setStatus("Payment failed: " + error.response.data.message);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div>{status ? <h1>{status}</h1> : <h1>Verifying Payment...</h1>}</div>
  );
};

export default PaymentStatus;
