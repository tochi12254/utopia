import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const workspaceId = searchParams.get("workspaceId");

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!workspaceId){
            return new NextResponse("Workspace ID missing", { status: 400 });
        }

        if(!params.memberId){
            return new NextResponse("Member ID missing", { status: 400 });
        }

        const workspace = await db.workspace.update({
            where: {
                id: workspaceId,
                profileId: profile.id
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                },   
            }
        });

        return NextResponse.json(workspace);

    } catch (error) {
        console.log("MEMBERS_ID_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
   try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const workspaceId = searchParams.get("workspaceId");
    
    if(!profile){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!workspaceId){
        return new NextResponse("Workspace ID missing", { status: 400 });
    }

    if(!params.memberId){
        return new NextResponse("Member ID missing", { status: 400 });
    }

    const workspace = await db.workspace.update({
        where: {
            id: workspaceId,
            profileId: profile.id,
        },
        data: {
            members: {
                update: {
                    where: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id
                        }
                    },
                    data: {
                        role
                    }
                }
            }
        },
        include: {
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    return NextResponse.json(workspace);

   } catch (error) {
    console.log("MEMBERS_ID_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}