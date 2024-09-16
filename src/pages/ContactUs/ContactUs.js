import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";

function ContactUs() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-slate-950/90 flex flex-col justify-center items-center text-center py-20 px-4">
        <h1 className="text-6xl font-bold text-white mb-4">Get in Touch</h1>
        <p className="text-xl text-slate-400 mb-6">
          We're here to help with your pet's needs. Reach out to us for any
          questions or concerns.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="flex flex-col items-center py-16 px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="flex flex-col">
              <form>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="p-3 border border-gray-300 rounded-md mb-4"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="p-3 border border-gray-300 rounded-md mb-4"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  {" "}
                  <label className="text-gray-700 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Your Message"
                    className="p-3 border border-gray-300 rounded-md mb-4"
                    rows="4"
                    required
                  />
                </div>

                <Button type="submit" variant="sospet">
                  Send Message
                </Button>
              </form>
            </div>
            {/* Contact Details */}
            <div className="flex flex-col space-y-8">
              <div className="flex items-center space-x-4">
                <MapPin className="text-orange-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    123 Pet Street, Pet City, PC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-orange-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-orange-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@sospet.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 text-center">
        <p className="text-sm">&copy; 2024 SOSPET. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="text-white text-xl hover:text-gray-400 transition duration-300" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="text-white text-xl hover:text-gray-400 transition duration-300" />
          </a>
          <a href="tel:+1234567890" target="_blank" rel="noopener noreferrer">
            <Phone className="text-white text-xl hover:text-gray-400 transition duration-300" />
          </a>
          <a
            href="mailto:imadeddine300@hotmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="text-white text-xl hover:text-gray-400 transition duration-300" />
          </a>
          <a
            href="https://www.instagram.com/imedoari.jpg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="text-white text-xl hover:text-gray-400 transition duration-300" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
