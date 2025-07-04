import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { userService } from "@/lib/services/user";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/profile/settings");
  }
  const userProfile = await userService.getMyProfileOnServer();
  if (!userProfile) {
    return <div>Could not load user data. Please try again later.</div>;
  }
  return (
    <div className="container mx-auto max-w-2xl p-4 py-8 md:py-12">
      <header className="mb-8">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account and profile information.
        </p>
      </header>
      <div>
        <EditProfileForm initialData={userProfile} />
      </div>
      {}
    </div>
  );
}