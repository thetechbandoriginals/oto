import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default function useServerToken() {
  return getServerSession(authOptions).then((session: any) => {
    let token = session?.user?.token;
    return token;
  });
}

export function getServerToken() {
  return getServerSession(authOptions).then((session: any) => {
    let token = session?.user?.token;
    return token;
  });
}