import { currentProfile } from "@/lib/current_profile"
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";

export const NavsideBar = async () => {
    const profile = await currentProfile();

    if(!profile) {
        toast.error("Unauthenticated!")
        return auth().redirectToSignIn();
    }

    const workspaces = await db.workspace.findMany({
        where: {
            members: {
              some: {
                  profileId: profile.id
              }
           }
        }
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="mb-4">
                  <NavItem id={workspace.id} name={workspace.name} imageUrl={workspace.imageUrl} />
                </div>
              ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
               <ModeToggle />
               <UserButton afterSignOutUrl="/sign-in" 
                 appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px]"
                    }
                 }}
               />
            </div>
        </div>
    )
}