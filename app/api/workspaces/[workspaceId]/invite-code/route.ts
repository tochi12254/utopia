import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : { params: {
        workspaceId: string
    } }
){
  try {
    const profile = await currentProfile();

    if(!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!params.workspaceId){
        return new NextResponse("Workspace ID Missing", { status: 400 })
    }

    const workspace = await db.workspace.update({
        where: {
            id: params.workspaceId,
            profileId: profile.id
        },
        data: {
            inviteCode: uuidv4(),
        },
    });

    return NextResponse.json(workspace);

  } catch (error) {
    console.log("[WORKSPACE_ID]", error);
    return new NextResponse("Internal Erro", { status: 500 });
  }
}