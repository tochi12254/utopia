import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { WorkspaceHeader } from "./workspace-header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { WorkspaceSearch } from "./workspace-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { WorkspaceSection } from "./workspace-section";
import { WorkspaceChannel } from "./workspace-channel";
import { WorkspaceMember } from "./workspace-member";

interface WorkspaceSidebarProps {
  workspaceId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-blue-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
}

export const WorkspaceSidebar = async ({ workspaceId } : WorkspaceSidebarProps) => {
const profile = await currentProfile();

if(!profile) {
    return auth().redirectToSignIn();
}

const workspace = await db.workspace.findUnique({
    where: {
        id: workspaceId,
    },
    include: {
        channels: {
            orderBy: {
                createdAt: "asc"
            },
        },
        members: {
            include: {
                profile: true
            },
            orderBy: {
                role: "asc",
            }
        }
    }
});

const textChannels = workspace?.channels.filter((channel) => channel.type === ChannelType.TEXT)
const audioChannels = workspace?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
const videoChannels = workspace?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
const members = workspace?.members.filter((member) => member.profileId !== profile.id)

if(!workspace) {
    return redirect("/space");
}

const role = workspace.members.find((member) => member.profileId === profile.id)?.role;


    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <WorkspaceHeader workspace={workspace} role={role} />
            <ScrollArea className="flex-1 px-3">
              <div className="mt-2">
                <WorkspaceSearch data={[
                    {
                        label: "Text Channels",
                        type: "channel",
                        data: textChannels?.map(( channel ) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        }))
                    },
                    {
                        label: "Voice Channels",
                        type: "channel",
                        data: audioChannels?.map(( channel ) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        }))
                    },
                    {
                        label: "Video Channels",
                        type: "channel",
                        data: videoChannels?.map(( channel ) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        }))
                    },
                    {
                        label: "Members",
                        type: "member",
                        data: members?.map(( member ) => ({
                            id: member.id,
                            name: member.profile.name,
                            icon: roleIconMap[member.role],
                        }))
                    }
                ]} />
              </div>
              <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
              { !!textChannels?.length && (
                <div className="mb-2">
                  <WorkspaceSection
                    sectionType="channels"
                    channelType={ChannelType.TEXT}
                    role={role}
                    label="Text Channels"
                  />
                  <div className="space-y-2">
                  { textChannels.map((channel) => (
                    <WorkspaceChannel 
                      key={workspace.id}
                      channel={channel}
                      role={role}
                      workspace={workspace}
                    />
                  )) }
                  </div>
                </div>
              ) }
               { !!audioChannels?.length && (
                <div className="mb-2">
                  <WorkspaceSection
                    sectionType="channels"
                    channelType={ChannelType.AUDIO}
                    role={role}
                    label="Voice Channels"
                  />
                  <div className="space-y-2">
                  { audioChannels.map((channel) => (
                    <WorkspaceChannel 
                      key={workspace.id}
                      channel={channel}
                      role={role}
                      workspace={workspace}
                    />
                  )) }
                  </div>
                </div>
              ) }
               { !!videoChannels?.length && (
                <div className="mb-2">
                  <WorkspaceSection
                    sectionType="channels"
                    channelType={ChannelType.VIDEO}
                    role={role}
                    label="Video Channels"
                  />
                  <div className="space-y-2">
                  { videoChannels.map((channel) => (
                    <WorkspaceChannel 
                      key={workspace.id}
                      channel={channel}
                      role={role}
                      workspace={workspace}
                    />
                  )) }
                  </div>
                </div>
              ) }
               { !!members?.length && (
                <div className="mb-2">
                  <WorkspaceSection
                    sectionType="members"
                    role={role}
                    label="Members"
                    workspace={workspace}
                  />
                  <div className="space-y-2">
                  { members.map((member) => (
                    <WorkspaceMember
                      key={member.id}
                      member={member}
                      workspace={workspace}
                    />
                  )) }
                  </div>
                </div>
              ) }
            </ScrollArea>
        </div>
    )
}