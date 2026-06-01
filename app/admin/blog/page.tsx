import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminBlogDashboard from "@/components/admin/AdminBlogDashboard";

export const metadata = {
  title: "Painel do Administrador | FreteLab",
  description: "Gerencie as postagens do blog do FreteLab.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminBlogDashboard />;
}
