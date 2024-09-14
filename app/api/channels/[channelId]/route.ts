import { currentProfile } from "@/lib/current_profile";
import { NextResponse } from "next/server";
import{ db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function PATCH(
    req: Request,
    { params } : { params : { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);
        
        const workspaceId = searchParams.get("workspaceId");

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!workspaceId) {
            return new NextResponse("Workspace Id missing", { status: 400 });
        }

        if(!params.channelId){
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        if(name === "general") {
            return new NextResponse("Channel name cannot be 'general'", { status: 400 });
        }

        const workspace  = await db.workspace.update({
            where: {
                id: workspaceId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.channelId,
                            NOT: {
                                name: 'general'
                            },
                        },
                        data: {
                            name,
                            type,
                        }
                    }
                }
            }
        });

        return NextResponse.json(workspace);

    } catch (error) {
        console.log("[CHANNEL_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params } : { params : { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        
        const workspaceId = searchParams.get("workspaceId");

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!workspaceId) {
            return new NextResponse("Workspace Id missing", { status: 400 });
        }

        if(!params.channelId){
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        const workspace  = await db.workspace.update({
            where: {
                id: workspaceId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        });

        return NextResponse.json(workspace);

    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}