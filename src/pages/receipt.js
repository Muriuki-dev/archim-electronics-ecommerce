import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamically import jsPDF and html2canvas to avoid SSR issues
const LogoComponent = () => (
  <div className="logo mb-4">
    <Link href="/">
      <div style={{ 
        display: 'inline-block',
        padding: '8px 12px',
        backgroundColor: '#f0fdf4',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '2px solid #22c55e'
      }}>
        <span style={{ 
          color: '#15803d',
          fontWeight: '800',
          fontSize: 'clamp(20px, 3vw, 32px)',
          letterSpacing: '0.5px',
          fontFamily: "'Montserrat', sans-serif",
          textTransform: 'uppercase'
        }}>
          ARCHIM<span style={{ color: '#22c55e' }}>ELECTRONICS</span>
        </span>
      </div>
    </Link>
  </div>
);

const Receipt = () => {
  const router = useRouter();
  const {
    orderId,
    phoneNumber,
    amount,
    date,
  } = router.query;

  const { cart_products } = useSelector((state) => state.cart);
  const [billingDetails, setBillingDetails] = useState(null);
  const receiptRef = useRef(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const redirectToWhatsAppWithoutPdf = useCallback(() => {
    const itemsList = cart_products.map(item => 
      `${item.title} (x${item.orderQuantity}) - KSh ${(item.price * item.orderQuantity).toFixed(2)}`
    ).join("\n");

    const message = `Hello PopoteShop!\n\nI've placed an order with these details:\n\n` +
                   `*Order ID:* ${orderId}\n` +
                   `*Phone:* ${phoneNumber}\n` +
                   `*Amount:* KSh ${amount}\n` +
                   `*Date:* ${date}\n\n` +
                   `*Items:*\n${itemsList}\n\n` +
                   `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254713735187?text=${encodedMessage}`, '_blank');
  }, [cart_products, orderId, phoneNumber, amount, date]);

  const generatePdfAndRedirect = useCallback(async () => {
    try {
      // Dynamically import the libraries only on client side
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      // Generate PDF
      const canvas = await html2canvas(receiptRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Prepare WhatsApp message
      const itemsList = cart_products.map(item => 
        `${item.title} (x${item.orderQuantity}) - KSh ${(item.price * item.orderQuantity).toFixed(2)}`
      ).join("\n");

      const message = `Hello Archim Electronics!\n\nI've placed an order with these details:\n\n` +
                     `*Order ID:* ${orderId}\n` +
                     `*Phone:* ${phoneNumber}\n` +
                     `*Amount:* KSh ${amount}\n` +
                     `*Date:* ${date}\n\n` +
                     `*Items:*\n${itemsList}\n\n` +
                     `Here's my receipt for confirmation.`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/254713735187?text=${encodedMessage}`, '_blank');
      
      setPdfGenerated(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      redirectToWhatsAppWithoutPdf();
    }
  }, [cart_products, orderId, phoneNumber, amount, date, redirectToWhatsAppWithoutPdf]);

  useEffect(() => {
    const handleReceiptGeneration = async () => {
      // Check if window is defined (client-side)
      if (typeof window !== 'undefined') {
        // Retrieve billing info from localStorage
        const storedBilling = localStorage.getItem("billingInfo");
        if (storedBilling) {
          setBillingDetails(JSON.parse(storedBilling));
        }

        // Generate PDF and redirect to WhatsApp after component mounts
        if (!pdfGenerated && orderId) {
          await generatePdfAndRedirect();
        }
      }
    };

    handleReceiptGeneration();
  }, [orderId, pdfGenerated, generatePdfAndRedirect]);

  return (
    <div className="container mt-5 mb-5">
      <div 
        ref={receiptRef}
        style={{ 
          maxWidth: "750px", 
          margin: "0 auto", 
          padding: "25px", 
          border: "1px solid #ccc", 
          borderRadius: "10px", 
          backgroundColor: "#fff" 
        }}
      >
        <LogoComponent />
        <h2 className="mb-4">Order Receipt</h2>

        <div className="mb-3"><strong>Order ID:</strong> {orderId}</div>
        <div className="mb-3"><strong>Phone Number:</strong> {phoneNumber}</div>
        <div className="mb-3"><strong>Date:</strong> {date}</div>
        <div className="mb-4"><strong>Total Amount:</strong> KSh {amount}</div>

        {billingDetails && (
          <div className="mb-4">
            <h4>Billing Information</h4>
            <p><strong>Name:</strong> {billingDetails.name}</p>
            <p><strong>Email:</strong> {billingDetails.email}</p>
            <p><strong>Address:</strong> {billingDetails.address}</p>
            <p><strong>City:</strong> {billingDetails.city}</p>
          </div>
        )}

        <h4>Products Ordered</h4>
        <ul className="list-group mb-4">
          {cart_products.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.title}</strong><br />
                Quantity: {item.orderQuantity}
              </div>
              <div>KSh {(item.price * item.orderQuantity).toFixed(2)}</div>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <p className="text-success"><strong>Thank you for shopping with us!</strong></p>
          <p className="text-success"><strong>You will be redirected to WhatsApp shortly to confirm your order.</strong></p>
          <p className="text-muted"><small>System generated receipt</small></p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
