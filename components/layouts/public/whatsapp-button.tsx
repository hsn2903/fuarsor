"use client";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Replace 'your-number' with the actual WhatsApp number you want to direct to
    window.location.href = "https://wa.me/+905358888881";
  };

  return (
    <button
      className="cursor-pointer fixed bottom-4 left-4 rounded-full  bg-[#25D366] shadow-lg p-4 z-50"
      onClick={handleWhatsAppClick}
    >
      <FaWhatsapp className="text-white" size={40} />
    </button>
  );
};

export default WhatsAppButton;
