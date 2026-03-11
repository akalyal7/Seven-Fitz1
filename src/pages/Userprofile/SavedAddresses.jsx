import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const SavedAddresses = ({ user }) => {

  const showToast = useToast();

  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  const fetchAddresses = async () => {

    setIsLoadingAddresses(true);

    try {

      const res = await fetch(
        `http://localhost:3000/addresses?userEmail=${encodeURIComponent(
          user.email
        )}`
      );

      const data = await res.json();

      setAddresses(data);

    } catch (error) {
      console.error(error);
    }

    setIsLoadingAddresses(false);
  };

  useEffect(() => {

    if (user?.email) fetchAddresses();

  }, [user]);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">Saved Addresses</h1>

      {isLoadingAddresses && <p>Loading...</p>}

      {addresses.length === 0 && (
        <p>No addresses found</p>
      )}

      {addresses.map((addr) => (
        <div key={addr.id} className="border p-4 rounded mb-4">

          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} />
            <span className="font-bold">{addr.type}</span>
          </div>

          <p>{addr.name}</p>
          <p>{addr.phone}</p>
          <p>{addr.address}, {addr.city}</p>

        </div>
      ))}

    </div>
  );
};

export default SavedAddresses;