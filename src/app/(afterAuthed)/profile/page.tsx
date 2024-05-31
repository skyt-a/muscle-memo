import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import * as Card from "@/components/ui/card";
import { css } from "styled-system/css";

export default async function Profile() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <main>
      <Card.Root className={cardStyle}>
        <Card.Header>
          <Card.Title>プロフィール</Card.Title>
        </Card.Header>
        <Card.Body>{data.user?.email}</Card.Body>
      </Card.Root>
    </main>
  );
}

const cardStyle = css({
  width: "calc(100vw - 80px)",
  margin: "40px",
});
