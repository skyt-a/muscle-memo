'use client'
import { logoutAction } from '@/app/(afterAuthed)/profile/actions'
import { Link } from '@nextui-org/link'
import toast from 'react-hot-toast'

export const LogOutButton = () => {
  return (
    <Link
      size="sm"
      onPress={async () => {
        await logoutAction()
        toast('ログアウトしました')
      }}
    >
      ログアウト
    </Link>
  )
}
