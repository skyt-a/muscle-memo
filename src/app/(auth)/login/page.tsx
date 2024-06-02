"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export default function Login() {
  return (
    <main>
      <Button
        variant="solid"
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/api/auth/callback`,
            },
          });
        }}
      >
        Login
      </Button>
    </main>
  );
}
