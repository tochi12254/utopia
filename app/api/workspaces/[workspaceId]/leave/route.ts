import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : { params: { workspaceId: string } }
) {
    try {
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!params.workspaceId) {
            return new NextResponse("Workspace ID missing", { status: 400 });
        }

        const workspace = await db.workspace.update({
            where: {
                id: params.workspaceId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(workspace);

    } catch (error) {
        console.log("WORKSPACE_ID_LEAVE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}