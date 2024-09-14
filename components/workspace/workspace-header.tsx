"use client"

import { WorkspaceWithMembersWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";


interface WorkspaceHeaderProps {
    workspace: WorkspaceWithMembersWithProfiles;
    role?: MemberRole;
};

export const WorkspaceHeader = ({ workspace, role } : WorkspaceHeaderProps) => {
const { onOpen } = useModal();
const isAdmin = role === MemberRole.ADMIN;
const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
              <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
               {workspace.name}
               <ChevronDown className="h-5 w-5 ml-auto" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
             className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
            >
              {isModerator && (
                <DropdownMenuItem className="text-blue-500 dark:text-blue-400 px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("invite", { workspace })}>
                    Invite People
                    <UserPlus className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("editWorkspace", { workspace })}>
                    Workspace Settings
                    <Settings className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("members", { workspace })}>
                    Manage Members
                    <Users className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
              )}
              {isModerator && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("createChannel")}>
                    Create Channel
                    <PlusCircle className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
              )}
              {isModerator && (
                <DropdownMenuSeparator />
              )}
              {isAdmin && (
                <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("deleteWorkspace", { workspace })}>
                    Delete Workspace
                    <Trash className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
              )}
              {!isAdmin && (
                <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("leaveWorkspace", { workspace })}>
                    Leave Workspace
                    <LogOut className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}