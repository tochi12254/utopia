import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);
        
        const workspaceId = searchParams.get("workspaceId");

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!workspaceId) {
            return new NextResponse("Workspace ID missing", { status: 400 });
        }

        if ( name === "general" ) {
            return new NextResponse("Channel name cannot be 'general'", { status: 400 });
        }

        const workspace = await db.workspace.update({
            where: {
                id: workspaceId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [
                                MemberRole.ADMIN, MemberRole.MODERATOR
                            ]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type
                    }
                }
            }
        });

        return NextResponse.json(workspace);

    } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}