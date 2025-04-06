
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending form data
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setSending(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-xs text-cyber-matrix/70 mb-2">
        -- New Message --
      </div>
      
      <div>
        <label htmlFor="name" className="text-cyber-matrix/90 text-sm mb-1 block">
          To: admin@terminal.io
        </label>
      </div>
      
      <div>
        <label htmlFor="name" className="text-cyber-matrix/90 text-sm mb-1 block">
          From:
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="bg-cyber-black border-cyber-matrix/30 text-cyber-matrix focus:border-cyber-matrix"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="text-cyber-matrix/90 text-sm mb-1 block">
          Reply-To:
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          className="bg-cyber-black border-cyber-matrix/30 text-cyber-matrix focus:border-cyber-matrix"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="text-cyber-matrix/90 text-sm mb-1 block">
          Message:
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message here..."
          required
          rows={6}
          className="bg-cyber-black border-cyber-matrix/30 text-cyber-matrix focus:border-cyber-matrix w-full resize-none"
        />
      </div>
      
      <Button
        type="submit"
        disabled={sending}
        className="bg-cyber-matrix/20 border border-cyber-matrix/50 text-cyber-matrix hover:bg-cyber-matrix/30"
      >
        {sending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
