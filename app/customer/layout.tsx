
import CustomerTemplate from "@/components/customer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tiket Kereta Api",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CustomerTemplate>
            {children}
        </CustomerTemplate>
    );
}
           