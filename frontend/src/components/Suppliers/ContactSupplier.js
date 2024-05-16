import { useRef, useEffect, useState } from "react"
import emailjs from 'emailjs-com';
import contactIcon from '../../images/Icons/contact.png';

export default function ContactSupplierPage() {

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => emailjs.init("ID5hHST5nKht9tr22"), []);
  // Add these
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_hdfcilv";
    const templateId = "template_yabuzgi";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
       name: nameRef.current.value,
        recipient: emailRef.current.value,
         message: messageRef.current.value
      });
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fertilizer-transparent-box" style={{ marginLeft: "340px", marginRight: "auto", marginTop: "50px", marginBottom: "20px", padding: "50px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "1000px" }}>
      <div style={{ backgroundColor: "#1E421D", padding: "20px", borderRadius: "15px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={contactIcon} alt="Supplier Icon" style={{ marginRight: "30px", width: "40px", height: "40px", filter: "invert(1)" }} />
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "bold", margin: "0" }}>Contact Supplier</h1>
      </div>
      <form className="for" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" placeholder="Enter name" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" placeholder="Enter email" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
          <label htmlFor="message">Message</label>
          <textarea ref={messageRef} id="message" placeholder="Enter your message" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", height: "150px" }} />
        </div>

        <button className="btn" disabled={loading} style={{ padding: "10px 20px", backgroundColor: "#1E421D", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", alignSelf: "flex-start" }}>
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
  
}