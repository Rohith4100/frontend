"use client";

import TopBar from "./topbar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
      },
      {
        flexDirection: "row"
      }
      }
    >
      <TopBar />

      <div
        style={{
          flex: 1,
          padding: "20px",
          height: "calc(100%-250px)",
          minHeight: 0
        }}
      >
        {children}
      </div>
    </div>
  );
}