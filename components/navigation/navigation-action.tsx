"use client"

import { useModal } from "@/hooks/use-modal-store";
import { ActionToolTip } from "../action-tooltip";
import { Plus } from "lucide-react";

export const NavigationAction = () => {
const { onOpen } = useModal();

    return (
        <div>
            <ActionToolTip side="right" align="center" label="Add a workspace">
               <button 
                className="group flex items-center"
                onClick={() => onOpen("createWorkspace")}
                >
                   <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-blue-500">
                      <Plus 
                        className="group-hover:text-white transition text-blue-500"
                        size={25} />
                   </div>
               </button>
            </ActionToolTip>
        </div>
    )
}