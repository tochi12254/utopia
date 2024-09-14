import { Workspace, Member, Profile } from "@prisma/client"

export type WorkspaceWithMembersWithProfiles = Workspace & {
    members: (Member & { profile: Profile })[];
};