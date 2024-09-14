import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params } : { params: { workspaceId: string } }
) {
    try {
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

         const workspace = await db.workspace.delete({
           where: {
            id: params.workspaceId,
            profileId: profile.id
           },
         });

         return NextResponse.json(workspace);

    } catch (error) {
        console.log("[WORKSPACE_ID_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH(
    req: Request,
    { params } : { params: { workspaceId: string } }
) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

         const workspace = await db.workspace.update({
           where: {
            id: params.workspaceId,
            profileId: profile.id
           },
           data: {
             name,
             imageUrl,
           }
         });

         return NextResponse.json(workspace);

    } catch (error) {
        console.log("[WORKSPACE_ID_PATCH", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}