import React from "react";
import { FaPhoneAlt, FaUserShield } from "react-icons/fa";

const emergencyContacts = [
  { name: "Alice Johnson", phone: "+1-555-123-4567" },
  { name: "Bob Smith", phone: "+1-555-987-6543" },
  { name: "Emergency Services", phone: "911" },
];

const Emergency: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-600 to-indigo-700 p-6"
    >
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 mt-10 space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <FaUserShield className="text-blue-600 text-3xl" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Emergency Contacts
          </h1>
        </div>

        <ul className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
              >
                <FaPhoneAlt className="mr-2" />
                Call
              </a>
            </li>
          ))}
        </ul>

        <footer className="text-sm text-gray-500 text-center pt-4 border-t border-gray-200">
          &copy; {new Date().getFullYear()} Virtual Escort Service
        </footer>
      </div>
    </div>
  );
};

export default Emergency;
