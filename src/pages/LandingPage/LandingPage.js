import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Earth,
  Facebook,
  HeartPulse,
  Instagram,
  Mail,
  PawPrint,
  Phone,
  Search,
  Twitter,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../services/userContext";
import petsBG from "../../images/petsBG.png";

function LandingPage() {
  const { currentUser } = useAuth();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="flex flex-col justify-center items-center text-center pb-20 px-4 pt-24"
        style={{
          backgroundImage: `url(${petsBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(128, 47, 0, 0.6)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
          }}
        >
          <h1 className="text-7xl sm:text-9xl font-bold mb-4">SOSPET.</h1>
          <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto">
            Your global pet emergency and care service. Connecting you with
            trusted help whenever you need it.
          </p>
          <h3 className="text-2xl sm:text-5xl font-bold mb-10">
            "YOU CAN'T BUY A HEART, BUT YOU CAN RESCUE ONE."
          </h3>
          <div className="flex flex-col justify-center gap-4">
            {!currentUser && (
              <Link to="/signup">
                <Button
                  className="bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 gap-2"
                  size="lg"
                >
                  <UserPlus size={15} />
                  Get Started
                </Button>
              </Link>
            )}
            <Link to="/AnimalPedia">
              <button className="inline-flex h-14 animate-shimmer items-center justify-center rounded-[22px] border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-12 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <Search className="inline-block mr-2" size={15} />
                AnimalPedia
              </button>
            </Link>
            <Link to="/EmergencyContacts">
              <Button variant="secondary" className="gap-2" size="lg">
                <Search className="inline-block mr-2" size={15} />
                Find Vets around me
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col items-center py-16 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Feature 1 */}
          <Link to="/EmergencyContacts">
            <div
              className="bg-white hover:bg-orange-50
             shadow-lg rounded-lg p-6 text-center"
            >
              <HeartPulse className="text-orange-500 text-4xl sm:text-5xl mb-4 mx-auto" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Emergency Contacts
              </h3>
              <p className="text-gray-600">
                Find emergency vet clinics and pet care services near you, 24/7.
              </p>
            </div>
          </Link>
          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <PawPrint className="text-green-500 text-4xl sm:text-5xl mb-4 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">Pet Care</h3>
            <p className="text-gray-600">
              Access resources and tips for keeping your pet healthy and happy.
            </p>
          </div>
          {/* Feature 3 */}
          <Link to="/AnimalPedia">
            <div className="bg-white hover:bg-orange-50 cursor-pointer shadow-lg rounded-lg p-6 text-center">
              <Earth className="text-blue-500 text-4xl sm:text-5xl mb-4 mx-auto" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                AnimalPedia
              </h3>
              <p className="text-gray-600">
                Learn about different animals, their habitats, and more.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-200 py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Ready to Help Your Pet
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
          Join our community and get immediate access to emergency services, pet
          care tips, and more.
        </p>
        <Link to="/ContactUs">
          <Button
            variant="sospet"
            className="text-white px-16 py-4 rounded-md transition duration-300"
            size="xl"
          >
            Contact Us
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">&copy; 2024 SOSPET. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <Twitter className="text-xl" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <Facebook className="text-xl" />
          </a>
          <a
            href="tel:+1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <Phone className="text-xl" />
          </a>
          <a
            href="mailto:sos-pet@mail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <Mail className="text-xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <Instagram className="text-xl" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
