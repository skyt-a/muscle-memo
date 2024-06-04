import { LogOutButton } from '@/app/(afterAuthed)/profile/components/LogoutButton'
import { createClient } from '@/lib/supabase/server'

export default async function Profile() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  return (
    <main>
      <div>プロフィール</div>
      <div>{data.user?.email}</div>
      <LogOutButton />
    </main>
  )
}
