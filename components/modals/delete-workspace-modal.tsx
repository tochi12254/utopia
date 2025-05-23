"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const DeleteWorkspaceModal = () => {
const { isOpen, onClose, type, data } = useModal();
const router = useRouter();

const isModalOpen = isOpen && type === "deleteWorkspace"
const { workspace } = data;

const [ isLoading, setIsLoading ] = useState(false);

const onClick = async () => {
  try {
    setIsLoading(true);
    
    await axios.delete(`/api/workspaces/${workspace?.id}`);
    onClose();
    toast.success(`${workspace?.name} deleted successfully!`)
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
                   Delete Workspace
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                  Are you sure you want to do this? <br /> 
                  <span className="text-blue-500 font-semibold">{workspace?.name}</span> will be permanently deleted.
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