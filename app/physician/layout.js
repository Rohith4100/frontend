// "use client";

// // import Sidebar from "./Sidebar";
// import TopBar from "@/components/topbar";
// export default function DashboardLayout({
//   children,
// }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//       }}
//     >
//       {/* <Sidebar /> */}
//       <TopBar />

//       <div
//         style={{
//           flex: 1,
//           width: "calc(100% - 250px)",
//           padding: "20px",
//           marginLeft: "250px",
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }


"use client";

import DashboardLayout from "@/components/TopBarLayout";
import TopBar from "@/components/topbar";

export default function PhysicianLayout({
  children,
}) {
  return (
    <DashboardLayout>
      {/* <TopBar /> */}
      {children}
    </DashboardLayout>
  );
}