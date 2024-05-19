import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // To manipulate the tabs
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  // To render different components
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // Set the location of the tab
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar*/}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
}
