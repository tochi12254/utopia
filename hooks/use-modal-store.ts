import { Channel, ChannelType, Workspace } from "@prisma/client";
import { create } from  "zustand";

export type ModalType = "createWorkspace" | "invite" | "editWorkspace" | "members"  | "createChannel" | "leaveWorkspace" | "deleteWorkspace" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

interface ModalData {
    workspace?: Workspace;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}))