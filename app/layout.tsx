
import type { Metadata } from "next";
import { Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

const font =  Plus_Jakarta_Sans({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
  title: "Utopia",
  description: "A collaborative workspace for designers and developers.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
       <html lang="en" suppressHydrationWarning>
         <body
           className={cn(font.className, "bg-white dark:bg-[#313338]")}>
            <ThemeProvider attribute="class"  defaultTheme="dark" enableSystem={false} storageKey="discord-theme">
            <SocketProvider>
              <Toaster 
                toastOptions={{
                  unstyled: true,
                  classNames: {
                    toast: 'bg-blue-300 dark:bg-zinc-700',
                    success: 'dark:text-white text-zinc-700',
                    error: 'dark:text-white text-zinc-700',
                    warning: 'dark:text-white text-zinc-700',
                  }
                }}
              />
              <ModalProvider />
               <QueryProvider>
                 {children}
               </QueryProvider>
            </SocketProvider>
           </ThemeProvider>
         </body>
       </html>
    </ClerkProvider>
  );
}
