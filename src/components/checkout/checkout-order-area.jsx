import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    discountAmount,
    shippingCost,
    isCheckoutSubmit,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const router = useRouter();

  const grandTotal = (parseFloat(total) + shippingCost - discountAmount).toFixed(2);
  const isValidPhone = phoneNumber.length === 10 && phoneNumber.startsWith("07");

  const handleOrderClick = (e) => {
    e.preventDefault();
    setShowOrderConfirmation(true);
  };

  const handleConfirmOrder = async () => {
    if (!isValidPhone) {
      setPhoneError("Please enter a valid phone number (e.g. 0712345678).");
      return;
    }
    setPhoneError(""); // Reset error if phone number is valid
    setSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      setSubmitting(false);
      setOrderConfirmed(true);
      generateReceipt();
    }, 1000);
  };

  const generateReceipt = async () => {
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const receiptData = {
      orderId,
      phoneNumber,
      amount: grandTotal,
      date: new Date().toLocaleString(),
      items: cart_products.map(item => ({
        title: item.title,
        quantity: item.orderQuantity,
        price: item.price.toFixed(2)
      }))
    };

    // Redirect to receipt page with data
    router.push({
      pathname: "/receipt",
      query: receiptData,
    });

    // After receipt is shown, it will handle WhatsApp redirect (see note below)
  };

  const redirectToWhatsApp = (receiptUrl) => {
    const message = `Hello! I've just placed an order with the following details:\n\n` +
                   `Order ID: ${orderId}\n` +
                   `Amount: KSh ${grandTotal}\n` +
                   `Items: ${cart_products.map(item => `${item.title} (x${item.orderQuantity})`).join(", ")}\n\n` +
                   `Here's my receipt: ${receiptUrl}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254713735187?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="tp-checkout-place white-bg" style={{ border: "1px solid black", padding: "20px" }}>
      {/* Added disclaimer box */}
      <div style={{
        border: "2px solid #FFD700",
        color: "black",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "5px",
        fontSize: "14px"
      }}>
        <strong>Important Notice:</strong> Archim Electronics does not receive payment directly. You need to order through our agent on WhatsApp. 
        After entering your phone number, you will be redirected to WhatsApp to complete your order. Thank you for understanding.
      </div>

      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
              </p>
              <span>KSh {item.price.toFixed(2)}</span>
            </li>
          ))}

          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>KSh {total.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>KSh {shippingCost.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>KSh {discountAmount.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>KSh {grandTotal}</span>
          </li>
        </ul>
      </div>

      {!showOrderConfirmation ? (
        <div className="tp-checkout-btn-wrapper mt-4">
          <button
            className="tp-checkout-btn w-100"
            onClick={handleOrderClick}
            disabled={isCheckoutSubmit}
          >
            Place Order via WhatsApp
          </button>
        </div>
      ) : !orderConfirmed ? (
        <div className="order-confirmation mt-4">
          <p><strong>Total Amount:</strong> KSh {grandTotal}</p>
          <label htmlFor="whatsapp-phone">Enter Your Phone Number:</label>
          <input
            type="tel"
            id="whatsapp-phone"
            className="form-control mb-3"
            placeholder="e.g. 0712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {phoneError && <p className="text-danger">{phoneError}</p>}
          <button
            type="button"
            className="tp-checkout-btn w-100"
            onClick={handleConfirmOrder}
            disabled={!isValidPhone || submitting}
          >
            {submitting ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      ) : (
        <div className="order-complete mt-4">
          <p>Your order is being processed. You will be redirected to WhatsApp to complete your order.</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutOrderArea;
