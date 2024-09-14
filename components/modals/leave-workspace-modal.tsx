"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const LeaveWorkspaceModal = () => {
const { isOpen, onClose, type, data } = useModal();
const router = useRouter();

const isModalOpen = isOpen && type === "leaveWorkspace"
const { workspace } = data;

const [ isLoading, setIsLoading ] = useState(false);

const onClick = async () => {
  try {
    setIsLoading(true);
    
    await axios.patch(`/api/workspaces/${workspace?.id}/leave`);
    onClose();
    toast.success(`You left ${workspace?.name}!`)
    router.refresh();
    router.push("/space");

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong!")
  } finally {
    setIsLoading(false);
  }
}



    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                   Leave Workspace
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                  Are you sure you want to leave <span className="font-semibold text-blue-300">{workspace?.name}</span>?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="bg-gray-100 px-6 py-4 ">
             <div className="flex items-center justify-between w-full">
              <Button disabled={isLoading} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button disabled={isLoading} variant="primary" onClick={onClick}>
                Confirm
              </Button>
             </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}