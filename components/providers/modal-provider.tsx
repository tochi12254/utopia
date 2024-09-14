"use client";

import { useEffect, useState } from "react";
import { CreateWorkspaceModal } from "@/components/modals/create-workspace-modal";
import { InviteModal } from "../modals/invite-modal";
import { EditWorkspaceModal } from "../modals/edit-workspace-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaveWorkspaceModal } from "../modals/leave-workspace-modal";
import { DeleteWorkspaceModal } from "../modals/delete-workspace-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";

export const ModalProvider = () => {
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
    setIsMounted(true);
}, [])

if(!isMounted) { 
   return null; 
}

    return (
        <>
           <CreateWorkspaceModal />
           <InviteModal />
           <EditWorkspaceModal />
           <MembersModal />
           <CreateChannelModal />
           <LeaveWorkspaceModal />
           <DeleteWorkspaceModal />
           <DeleteChannelModal />
           <EditChannelModal />
           <MessageFileModal />
           <DeleteMessageModal />
        </>
    )
}