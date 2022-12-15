import { signOut } from "firebase/auth";
import LayoutDashboard from "../../components/commons/dashboard/layouts/LayoutDashboard";
import { auth } from "../../lib/firebase";

export default function Dashboard() {
  return (
   <LayoutDashboard/>
  );
}
