import React, { useEffect, useState } from "react";
import { getProgress } from "./partnerApi";

export default function PartnerDashboard({ userId }) {
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    getProgress(userId).then(setProgress);
  }, [userId]);
  if (!progress) return <div>Loading...</div>;
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Partner Dashboard</h2>
      <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto text-xs">{JSON.stringify(progress, null, 2)}</pre>
    </div>
  );
}
