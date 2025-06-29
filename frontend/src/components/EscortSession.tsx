// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaPlayCircle,
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaExclamationTriangle,
//   FaSpinner,
//   FaShieldAlt,
// } from "react-icons/fa";

// interface Location {
//   latitude: number;
//   longitude: number;
// }

// type SessionStatus = "idle" | "active" | "escalated" | "starting";

// const EscortSession: React.FC = () => {
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [status, setStatus] = useState<SessionStatus>("idle");
//   const [location, setLocation] = useState<Location | null>(null);
//   const [trackingIntervalId, setTrackingIntervalId] =
//     useState<NodeJS.Timeout | null>(null);
//   const [promptIntervalId, setPromptIntervalId] =
//     useState<NodeJS.Timeout | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     return () => {
//       if (trackingIntervalId) clearInterval(trackingIntervalId);
//       if (promptIntervalId) clearInterval(promptIntervalId);
//     };
//   }, [trackingIntervalId, promptIntervalId]);

//   const startSession = async () => {
//     setError("");
//     setMessage("Attempting to start session...");
//     setStatus("starting");

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       setStatus("idle");
//       setMessage("");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const initialLocation = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setLocation(initialLocation);

//           const res = await axios.post("http://localhost:5000/api/sessions", {
//             userId: "user123",
//             location: initialLocation,
//           });

//           if (res.data && res.data._id) {
//             const id = res.data._id;
//             setSessionId(id);
//             setStatus("active");
//             setMessage("✅ Escort session started successfully!");
//             startTracking(id);
//             startSafetyPrompt(id);
//           } else {
//             setError("Failed to create session: Invalid response.");
//             setStatus("idle");
//             setMessage("");
//           }
//         } catch (err) {
//           console.error("❌ Failed to start session:", err);
//           setError("Failed to start session. Please try again.");
//           setStatus("idle");
//           setMessage("");
//         }
//       },
//       (geoError) => {
//         setError(
//           `Unable to get your location: ${geoError.message}. Please enable location services.`
//         );
//         setStatus("idle");
//         setMessage("");
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

//   const startTracking = (id: string) => {
//     const interval = setInterval(() => {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const newLocation: Location = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setLocation(newLocation);

//           try {
//             await axios.put(`http://localhost:5000/api/sessions/${id}`, {
//               location: newLocation,
//               status: status,
//             });
//           } catch (err) {
//             console.error("⚠ Failed to update location:", err);
//           }
//         },
//         (error) => {
//           console.error("⚠ Error getting updated location:", error);
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     }, 10000);
//     setTrackingIntervalId(interval);
//   };

//   const startSafetyPrompt = (id: string) => {
//     const interval = setInterval(() => {
//       const confirmCheck = window.confirm(
//         "Are you okay? Click OK if you are safe, or Cancel to escalate."
//       );
//       if (!confirmCheck) {
//         setStatus("escalated");
//         setMessage("🚨 Escalation triggered! Emergency contacts notified.");
//         axios
//           .put(`http://localhost:5000/api/sessions/${id}`, {
//             status: "escalated",
//           })
//           .catch((err) => {
//             console.error("⚠ Escalation update failed:", err);
//             setError("Failed to update escalation status on server.");
//           });
//         if (promptIntervalId) clearInterval(promptIntervalId);
//         if (trackingIntervalId) clearInterval(trackingIntervalId);
//       } else {
//         setMessage("✅ You confirmed safety. Continuing session...");
//       }
//     }, 120000);
//     setPromptIntervalId(interval);
//   };

//   const getStatusColor = (currentStatus: SessionStatus) => {
//     switch (currentStatus) {
//       case "active":
//         return "text-green-600";
//       case "escalated":
//         return "text-red-600";
//       case "starting":
//         return "text-yellow-600";
//       default:
//         return "text-gray-600";
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center relative p-4"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1602526211168-b98c1bb98b41?auto=format&fit=crop&w=1950&q=80')",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

//       <div className="relative z-10 w-full text-center py-8 bg-gradient-to-r from-blue-700 to-indigo-800 bg-opacity-90 shadow-lg mb-8 rounded-b-xl">
//         <div className="flex flex-col items-center space-y-4 text-white">
//           <FaShieldAlt className="text-5xl" />
//           <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
//             Virtual Escort Service
//           </h1>
//           <p className="text-base sm:text-lg opacity-90">
//             Your safety is our priority.
//           </p>
//         </div>
//       </div>

//       <div className="relative z-10 max-w-md w-full mx-auto bg-white/95 rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-6 border border-blue-100 animate-fade-in">

//         <button
//           onClick={startSession}
//           disabled={status === "active" || status === "starting"}
//           className={`w-full flex items-center justify-center py-4 rounded-xl font-semibold text-base sm:text-lg transition duration-300 transform
//             ${
//               status === "active" || status === "starting"
//                 ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md hover:scale-105 hover:from-blue-700 hover:to-indigo-800"
//             }`}
//         >
//           {status === "starting" ? (
//             <>
//               <FaSpinner className="animate-spin mr-3" /> Starting Session...
//             </>
//           ) : status === "active" ? (
//             <>
//               <FaCheckCircle className="mr-3" /> Session Active
//             </>
//           ) : (
//             <>
//               <FaPlayCircle className="mr-3" /> Start Escort Session
//             </>
//           )}
//         </button>

//         {message && (
//           <p className="text-sm font-medium text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-center justify-center">
//             {message}
//           </p>
//         )}

//         {error && (
//           <p className="text-sm font-medium text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 flex items-center justify-center">
//             <FaExclamationTriangle className="mr-2" /> {error}
//           </p>
//         )}

//         {sessionId && (status === "active" || status === "escalated") && (
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center space-y-4 shadow-inner">
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
//               <FaCheckCircle className="text-green-500 mr-2" /> Session Details
//             </h2>
//             <p className="text-gray-700">
//               <strong className="font-medium">Session ID:</strong>{" "}
//               <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
//                 {sessionId}
//               </span>
//             </p>
//             <p className="flex items-center justify-center">
//               <strong className="font-medium mr-2">Status:</strong>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
//                   status
//                 )} ${
//                   status === "active"
//                     ? "bg-green-100"
//                     : status === "escalated"
//                     ? "bg-red-100"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </span>
//             </p>

//             {location && (
//               <div className="mt-3 border-t pt-3 border-blue-100 space-y-1 text-sm">
//                 <p className="text-gray-700 flex items-center justify-center">
//                   <FaMapMarkerAlt className="text-blue-500 mr-2" />
//                   <strong className="font-medium">Current Location</strong>
//                 </p>
//                 <p className="text-gray-600">
//                   Lat: <span className="font-mono">{location.latitude.toFixed(5)}</span>
//                 </p>
//                 <p className="text-gray-600">
//                   Long: <span className="font-mono">{location.longitude.toFixed(5)}</span>
//                 </p>
//               </div>
//             )}

//             {status === "escalated" && (
//               <p className="text-red-700 font-semibold text-sm mt-3 flex items-center justify-center bg-red-50 p-2 rounded-lg border border-red-200">
//                 <FaExclamationTriangle className="mr-2" /> Emergency: Escalation Triggered!
//               </p>
//             )}
//           </div>
//         )}

//         <footer className="text-xs text-gray-500 mt-6">
//           &copy; {new Date().getFullYear()} Virtual Escort Service. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default EscortSession;

//-----------------------------------------------------------------------------------
// import React, { useState } from "react";
// import axios from "axios";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";





// interface Location {
//   latitude: number;
//   longitude: number;
// }

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const RecenterMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
//   const map = useMap();
//   map.setView([lat, lng]);
//   return null;
// };

// const EscortSession: React.FC = () => {
//   const [sessionId, setSessionId] = useState<string>("");
//   const [status, setStatus] = useState<"idle" | "active" | "escalated">(
//     "idle"
//   );
//   const [location, setLocation] = useState<Location | null>(null);
//   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

//   const startSession = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         console.log("🌍 Initial location:", position.coords);
//         try {
//           const res = await axios.post("http://localhost:5000/api/sessions", {
//             userId: "user123",
//             location: {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             },
//           });

//           if (res.data && res.data._id) {
//             const id = res.data._id;
//             setSessionId(id);
//             setStatus("active");
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//             console.log(`✅ Session created: ${id}`);
//             startTracking(id);
//             startPrompt(id);
//           }
//         } catch (error) {
//           console.error("❌ Failed to start session:", error);
//         }
//       },
//       (error) => {
//         console.error("❌ Failed to get location:", error);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

//   const startTracking = (id: string) => {
//     setInterval(() => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newLocation: Location = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setLocation(newLocation);

//           console.log("📍 Updated location:", newLocation);

//           axios
//             .put(`http://localhost:5000/api/sessions/${id}`, {
//               location: newLocation,
//               status: status,
//             })
//             .then(() => {
//               console.log(`✅ Location updated on server. Status: ${status}`);
//             })
//             .catch((err) => {
//               console.error("⚠ Failed to update location:", err);
//             });
//         },
//         (error) => {
//           console.error("❌ Failed to update location:", error);
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     }, 10000);
//   };

//   const startPrompt = (id: string) => {
//     const interval = setInterval(() => {
//       const confirmCheck = window.confirm("Are you okay?");
//       if (!confirmCheck) {
//         setStatus("escalated");
//         console.log("⚠ Escalation triggered!");
//         axios
//           .put(`http://localhost:5000/api/sessions/${id}`, {
//             status: "escalated",
//           })
//           .then(() => {
//             console.log("✅ Escalation status updated on server.");
//           })
//           .catch((err) => {
//             console.error("⚠ Escalation update failed:", err);
//           });
//         clearInterval(interval);
//       } else {
//         console.log("✅ User confirmed safety. Continuing session...");
//       }
//     }, 120000);
//     setTimer(interval);
//   };

//   return (
//     <div
//     className="min-h-screen flex items-center justify-center relative p-4"
//     style={{
//     backgroundColor: "#1e3a8a", // Tailwind blue-900
//     }}
//     >

//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//       <div className="relative z-10 p-8 max-w-3xl w-full mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-xl space-y-6 text-center">
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
//           🚨 Virtual Escort Service
//         </h1>

//         <button
//           onClick={startSession}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 text-lg rounded-lg"
//         >
//           Start Escort Session
//         </button>

//         {sessionId && (
//           <div className="mt-6 space-y-4 text-left text-lg">
//             <p className="text-green-700 font-medium">
//               ✅ Session ID: {sessionId}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={
//                   status === "escalated"
//                     ? "text-red-600 font-bold"
//                     : "text-blue-600 font-bold"
//                 }
//               >
//                 {status}
//               </span>
//             </p>
//             {location && (
//               <>
//                 <p>
//                   📍 <strong>Latitude:</strong> {location.latitude.toFixed(5)}
//                 </p>
//                 <p>
//                   📍 <strong>Longitude:</strong> {location.longitude.toFixed(5)}
//                 </p>
//                 <div className="h-80 w-full mt-4 rounded-lg overflow-hidden border border-gray-300">
//                   <MapContainer
//                     center={[location.latitude, location.longitude]}
//                     zoom={16}
//                     scrollWheelZoom={false}
//                     style={{ height: "100%", width: "100%" }}
//                   >
//                     <TileLayer
//                       attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <Marker position={[location.latitude, location.longitude]}>
//                       <Popup>You are here</Popup>
//                     </Marker>
//                     <RecenterMap
//                       lat={location.latitude}
//                       lng={location.longitude}
//                     />
//                   </MapContainer>
//                 </div>
//               </>
//             )}
//             {status === "escalated" && (
//               <p className="text-red-600 font-bold text-xl">
//                 ⚠ Escalation triggered!
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EscortSession;

//------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaRobot,
} from "react-icons/fa";

// Fix default icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Location {
  latitude: number;
  longitude: number;
}

const EscortSession: React.FC = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "active" | "escalated">("idle");
  const [location, setLocation] = useState<Location | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showBotPrompt, setShowBotPrompt] = useState<boolean>(false);

  const startSession = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/sessions`, {
          userId: "user123",
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });

        if (res.data && res.data._id) {
          const id = res.data._id;
          setSessionId(id);
          setStatus("active");
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log("✅ Session started with ID:", id);
          startTracking(id);
          startPrompt(id);
        }
      } catch (error) {
        console.error("❌ Failed to start session:", error);
      }
    });
  };

  const startTracking = (id: string) => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(newLocation);

        axios
          .put(`http://localhost:5000/api/sessions/${id}`, {
            location: newLocation,
            status: status,
          })
          .then(() => {
            console.log("📍 Location updated:", newLocation);
          })
          .catch((err) => {
            console.error("⚠ Failed to update location:", err);
          });
      });
    }, 10000);
  };

  const startPrompt = (id: string) => {
    const interval = setInterval(() => {
      const confirmCheck = window.confirm("Are you okay?");
      if (!confirmCheck) {
        setStatus("escalated");
        setShowBotPrompt(true);
        axios
          .put(`http://localhost:5000/api/sessions/${id}`, {
            status: "escalated",
          })
          .catch((err) => {
            console.error("⚠ Escalation update failed:", err);
          });
        clearInterval(interval);
      }
    }, 120000);
    setTimer(interval);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-6">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl space-y-4 text-center animate-fade-in">
        <div className="flex items-center justify-center space-x-3">
          <FaRobot className="text-blue-600 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">
            Virtual Escort Session
          </h1>
        </div>

        <button
          onClick={startSession}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-6 rounded"
        >
          Start Escort Session
        </button>

        {sessionId && (
          <div className="bg-gray-50 p-4 rounded-xl border text-left space-y-3">
            <p className="text-green-700 font-medium">
              ✅ Session ID: {sessionId}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  status === "escalated" ? "text-red-600" : "text-blue-600"
                }
              >
                {status}
              </span>
            </p>
            {location && (
              <>
                <p>
                  📍 <strong>Latitude:</strong>{" "}
                  {location.latitude.toFixed(5)}
                </p>
                <p>
                  📍 <strong>Longitude:</strong>{" "}
                  {location.longitude.toFixed(5)}
                </p>
              </>
            )}
          </div>
        )}

        {location && (
          <div className="h-64 mt-4 rounded overflow-hidden">
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={15}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[location.latitude, location.longitude]}
              >
                <Popup>Your current location</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>

      {showBotPrompt && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-shrink-0">
              <FaRobot className="text-blue-600 text-5xl" />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center sm:justify-start space-x-2">
                <FaExclamationTriangle className="text-red-600" />
                <span>Emergency Assistance</span>
              </h2>
              <p className="text-gray-700">
                Would you like me to call emergency services for you?
              </p>
              <div className="flex flex-col space-y-3">
                <a
                  href="tel:100"
                  className="w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded"
                >
                  <FaPhoneAlt className="mr-2" />
                  Call Police
                </a>
                <a
                  href="tel:102"
                  className="w-full inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded"
                >
                  <FaPhoneAlt className="mr-2" />
                  Call Ambulance
                </a>
                <button
                  onClick={() => setShowBotPrompt(false)}
                  className="w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded"
                >
                  No Thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscortSession;

