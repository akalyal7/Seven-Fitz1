import React from "react";

const AccountSettings = ({ user }) => {

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Account Settings
      </h1>

      <div className="bg-white p-6 rounded border">

        <div className="grid md:grid-cols-2 gap-6">

          <input
            defaultValue={user.name}
            className="border px-4 py-2 rounded"
          />

          <input
            defaultValue={user.email}
            disabled
            className="border px-4 py-2 rounded bg-gray-100"
          />

          <input
            placeholder="Phone Number"
            className="border px-4 py-2 rounded"
          />

        </div>

        <button className="mt-6 bg-black text-[#e5a852] px-6 py-2 rounded">
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default AccountSettings;