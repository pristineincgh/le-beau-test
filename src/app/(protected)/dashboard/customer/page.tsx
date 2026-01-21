import { requireAuth } from "@/lib/auth-utils"

const CustomerDashboardPage = async () => {
  await requireAuth();
  
  return (
    <div>CustomerDashboardPage</div>
  )
}
export default CustomerDashboardPage