import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    workspaceId: string;
    channelId: string;
  }
}

const ChannelIdPage = async ({
    params
} : ChannelIdPageProps) => {
const profile = await currentProfile();

if(!profile) {
    return auth().redirectToSignIn();
}

const channel = await db.channel.findUnique({
    where: {
        id: params.channelId,
    }
});

const member = await db.member.findFirst({
    where: {
        workspaceId: params.workspaceId,
        profileId: profile.id,
    }
});

if (!channel || !member) {
    return redirect("/space");
}

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
              name={channel.name}
              workspaceId={channel.workspaceId}
              type="channel"
            />
            {channel.type === ChannelType.TEXT && (
               <>
            <ChatMessages
             member={member}
             name={channel.name}
             chatId={channel.id}
             type="channel"
             apiUrl="/api/messages"
             socketUrl="/api/socket/messages"
             socketQuery={{
                channelId: channel.id,
                workspaceId: channel.workspaceId
             }}
             paramKey="channelId"
             paramValue={channel.id}
            />
            <ChatInput 
             name={channel.name} 
             type="channel" 
             apiUrl="/api/socket/messages" 
             query={{ 
                channelId: channel.id, 
                workspaceId: channel.workspaceId 
                }} 
            />
            </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom 
                  chatId={channel.id}
                  video={false}
                  audio={true}
                />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom 
                  chatId={channel.id}
                  video={true}
                  audio={true}
                />
            )}
        </div>
    )
}

export default ChannelIdPage;