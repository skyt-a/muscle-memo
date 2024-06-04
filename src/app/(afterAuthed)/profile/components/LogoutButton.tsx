'use client'
import { logoutAction } from '@/app/(afterAuthed)/profile/actions'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export const LogOutButton = () => {
  return (
    <Button
      variant="solid"
      onClick={async () => {
        await logoutAction()
        toast('ログアウトしました')
      }}
    >
      ログアウト
    </Button>
  )
}
