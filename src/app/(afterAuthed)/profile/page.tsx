import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Profile() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <main>
        <div>プロフィール</div>
        <div>{data.user?.email}</div>
    </main>
  );
}
