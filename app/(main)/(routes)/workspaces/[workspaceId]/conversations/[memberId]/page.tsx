import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
        workspaceId: string;
    },
    searchParams: {
        video?: boolean
    }
}

const MemberIdPage = async ({
    params,
    searchParams
} : MemberIdPageProps) => {
const profile = await currentProfile();

if(!profile){
    return auth().redirectToSignIn()
}

const currentMember = await db.member.findFirst({
    where: {
        workspaceId: params.workspaceId,
        profileId: profile.id
    },
    include: {
        profile: true,
    }
});

if(!currentMember){
    return redirect("/space");
}

const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

if(!conversation) {
    return redirect(`/workspaces/${params.workspaceId}`);
}

const { memberOne, memberTwo } = conversation;

const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;


    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
             imageUrl={otherMember.profile.imageUrl} 
             name={otherMember.profile.name} 
             workspaceId={params.workspaceId} 
             type="conversation" 
             />
             {searchParams.video && (
                <MediaRoom 
                  chatId={conversation.id}
                  video={true}
                  audio={true}
                />
             )}
             {!searchParams.video && (
                <>
                  <ChatMessages 
                   member={currentMember}
                   name={otherMember.profile.name}
                   chatId={conversation.id}
                   type="conversation"
                   apiUrl="/api/direct-messages"
                   paramKey="conversationId"
                   paramValue={conversation.id}
                   socketUrl="/api/socket/direct-messages"
                   socketQuery={{
                      conversationId: conversation.id
                   }}
                  />
                  <ChatInput 
                   name={otherMember.profile.name} 
                   type="conversation" 
                   apiUrl="/api/socket/direct-messages" 
                   query={{ 
                      conversationId: conversation.id 
                   }} 
                  />
                </>
             )}
        </div>
    )
}

export default MemberIdPage;