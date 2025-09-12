import { USER } from "@/utils/types";
import { useSession } from "next-auth/react";

export default function useClientUser(): USER | null {
    const { data }: any = useSession();
    let user: USER = data?.user
    return user;
}