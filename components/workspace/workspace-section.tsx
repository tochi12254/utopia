"use client";

import { WorkspaceWithMembersWithProfiles } from "@/types";

import { ChannelType, MemberRole } from "@prisma/client";
import { ActionToolTip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface WorkspaceSearchProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    workspace?: WorkspaceWithMembersWithProfiles;
};

export const WorkspaceSection = ({
    label,
    role,
    sectionType,
    channelType,
    workspace
} : WorkspaceSearchProps) => {
    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionToolTip label="Create Channel" side="top">
                    <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" onClick={() => onOpen("createChannel", { channelType })}>
                        <Plus className="h-4 w-4" />
                    </button>
                </ActionToolTip>
            )}
            { role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionToolTip label="Manage Members" side="top">
                <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" onClick={() => onOpen("members", { workspace })}>
                    <Settings className="h-4 w-4" />
                </button>
            </ActionToolTip>
            ) }
        </div>
    )
};