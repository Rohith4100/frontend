import CompletedOrders from "@/components/completed-orders";
import protectedRoute from "@/components/protectedRoute";
export default function Page() {
  return (
  // <protectedRoute role="Lab Technician">
    <CompletedOrders />
  // </protectedRoute>
  );
  
}