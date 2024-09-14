import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { NavsideBar } from "./navigation/navigation-sidebar";
import { WorkspaceSidebar } from "./workspace/workspace-sidebar";

export const MobileToggle = ({
    workspaceId
} : {
    workspaceId: string;
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
             <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
             </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
              <div className="w-[72px]">
                <NavsideBar />
              </div>
              <WorkspaceSidebar workspaceId={workspaceId} />
            </SheetContent>
        </Sheet>
    )
}