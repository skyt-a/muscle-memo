import { LogOutButton } from '@/app/(afterAuthed)/profile/components/LogoutButton'
import { createClient } from '@/lib/supabase/server'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import styled from './page.module.css'

export default async function Profile() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  return (
    <main className={styled.wrapper}>
      <Card className={styled.card}>
        <CardHeader>プロフィール</CardHeader>
        <CardBody>{data.user?.email}</CardBody>
      </Card>
      <div className={styled['button-wrapper']}>
        <LogOutButton />
      </div>
    </main>
  )
}
