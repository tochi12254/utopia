"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1, {message: "Workspace name is required"}),
    imageUrl: z.string().min(1, { message: "Workspace Image is required" })
})

export const InitialModal = () => {
const [isMounted, setIsMounted] = useState(false);

const router = useRouter();

useEffect(() => {
    setIsMounted(true)
}, [])


 const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        imageUrl: ""
    }
 });

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/workspaces", values);
      form.reset();
      toast.success('Workspace created successfully!')
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
 }

 if(!isMounted) return null;


    return (
        <Dialog open>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                   Create your Workspace
                </DialogTitle>
                <DialogDescription className="text-zinc-500 text-center" >
                   Give your workspace a personality with a name and image. You can always change it later
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-8 px-6">
                    <div className="flex items-center justify-center text-center">
                       <FormField 
                         control={form.control}
                         name="imageUrl"
                         render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileUpload 
                                endpoint="workspaceImage"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                         )}
                       />
                    </div>

                    <FormField
                         control={form.control}
                         name="name"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Workspace name</FormLabel>
                             <FormControl>
                               <Input 
                                  disabled={isLoading}
                                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                  placeholder="Enter workspace name" 
                                  {...field} 
                               />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                  </div>
                  <DialogFooter className="bg-gray-100 px-6 py-4">
                    <Button variant="primary" disabled={isLoading}>
                        Create
                    </Button>
                  </DialogFooter>
                </form>
            </Form>
          </DialogContent>
        </Dialog>
    )
}