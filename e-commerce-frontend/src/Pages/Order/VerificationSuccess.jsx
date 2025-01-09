import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        const response = await axios.get(
          `http://localhost:5000/api/payment/verify?pxid=${pxid}`
        );

        if (response.status === 200 && response.data.success) {
          toast.success("Payment verified successfully!");
          navigate("/orders"); // Redirect user to orders page or a confirmation page
        } else {
          toast.error("Payment verification failed. Please try again.");
          navigate("/cart");
        }
      } catch (error) {
        toast.error(
          `Verification error: ${
            error.response?.data?.message || error.message
          }`
        );
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-semibold">Verifying your payment...</h1>
    </div>
  );
};

export default VerificationSuccess;
