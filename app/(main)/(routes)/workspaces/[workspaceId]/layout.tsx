import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const WorkspaceIdLayout = async ({ children, params, } : { children: React.ReactNode; params: { workspaceId: string } }) => {
const profile = await currentProfile();

if(!profile) {
    return auth().redirectToSignIn();
}

const  workspace = await db.workspace.findUnique({
    where: {
        id: params.workspaceId,
        members: {
            some: {
                profileId: profile.id
            }
        }
    }
});

if(!workspace) {
    return redirect("/space")
}

    return (
        <div className="h-full">
          <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
            <WorkspaceSidebar workspaceId={params.workspaceId} />
          </div>
          <main className="h-full md:pl-60">
            {children}
          </main>
        </div>
    )
}

export default WorkspaceIdLayout;