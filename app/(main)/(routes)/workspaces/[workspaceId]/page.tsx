import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  }
}

const WorkspaceIdPage = async ({
  params
} : WorkspaceIdPageProps) => {
const profile = await currentProfile();

if(!profile) {
  return auth().redirectToSignIn();
}

const workspace = await db.workspace.findUnique({
  where: {
    id: params.workspaceId,
    members: {
      some: {
        profileId: profile.id,
      }
    }
  },
  include: {
    channels: {
      where: {
        name: "general"
      },
      orderBy: {
        createdAt: "asc"
      }
    }
  }
});

const initialChannel = workspace?.channels[0];

if(initialChannel?.name !== "general"){
  return null;
}
    
  return redirect(`/workspaces/${params.workspaceId}/channels/${initialChannel?.id}`)
}

export default WorkspaceIdPage;

