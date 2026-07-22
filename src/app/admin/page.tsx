import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getAdminData } from "@/lib/admin-data";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAuthed()) {
    redirect("/admin/login");
  }

  const { today, week, pendingTestimonials, configured } = await getAdminData();

  return (
    <div className="min-h-dvh bg-sand-50">
      <main className="container-content max-w-3xl py-10 sm:py-14">
        {!configured && (
          <div className="mb-8 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase no está configurado. Añade las variables de entorno para
            ver las citas reales.
          </div>
        )}
        <AdminDashboard
          today={today}
          week={week}
          pendingTestimonials={pendingTestimonials}
        />
      </main>
    </div>
  );
}
