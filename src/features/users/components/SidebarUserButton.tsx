import { Suspense } from "react";
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient";
import { getCurrentUser } from "@/services/clerk/libs/getCurrentUser";
import { SignOutButton } from "@/services/clerk/components/AuthButton";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";

export function SidebarUserButton() {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  )
}


async function SidebarUserSuspense() {
  const currentUser = await getCurrentUser({ allData: true });

  if (!currentUser || !currentUser.user) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Log out</span>
        </SidebarMenuButton>
      </SignOutButton>
    )
  }

  return (
    <SidebarUserButtonClient {...{ user: currentUser.user }} />
  )

}