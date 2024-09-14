import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = async ({ params } : InviteCodePageProps) => {
const profile = await currentProfile();

if(!profile){
    return auth().redirectToSignIn();
}

if(!params.inviteCode) {
    return redirect("/space");
}

const existingWorkspace = await db.workspace.findFirst({
    where: {
        inviteCode: params.inviteCode,
        members: {
            some: {
                profileId: profile.id
            }
        }
    }
});

if(existingWorkspace){
    redirect(`/workspaces/${existingWorkspace.id}`)
}

const workspace = await db.workspace.update({
    where: {
        inviteCode: params.inviteCode,
    },
    data: {
        members: {
            create: [
                {
                    profileId: profile.id,
                }
            ]
        }
    }
});

if(workspace) {
    return redirect(`/workspaces/${workspace.id}`)
}

    return null;
}

export default InviteCodePage;