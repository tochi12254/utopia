import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();
        
        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const workspace = await db.workspace.create({
            data: {
               profileId: profile.id,
               name,
               imageUrl,
               inviteCode: uuidv4(),
               channels: {
                create: [
                    { name: "general", profileId: profile.id }
                ]
               },
               members: {
                create: [
                    { profileId: profile.id, role: MemberRole.ADMIN }
                ]
               }
            }
        });

        return NextResponse.json(workspace);

    } catch (error) {
        console.log("[WORKSPACES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}