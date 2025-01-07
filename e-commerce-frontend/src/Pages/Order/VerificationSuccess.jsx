import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // verify payment
  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const pxid = params.get("pxid");
      if (!pxid) {
        toast.error("Payment token is missing!");
        navigate("/cart");
        return;
      }
      try {
        const response = axios.get(
          `http://localhost:5000/api/payment/verify?pxid=${pxid}`
        );
        if (response.data.success) {
          toast.success("Payment Verified Successfully!");
          navigate("/"); // Redirect to the home page
        } else {
          toast.error("Payment Verification Failed!");
          navigate("/cart"); // Redirect back to the cart
        }
      } catch (e) {
        toast.error(e.message);
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [navigate, location]);

  return (
    <div className="text-center mt-10">
      <h1>Verifying Payment...</h1>
    </div>
  );
};

export default VerificationSuccess;
