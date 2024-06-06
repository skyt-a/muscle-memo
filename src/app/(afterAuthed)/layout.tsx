import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import classname from './layout.module.css'

export const metadata: Metadata = {
  title: '筋トレメモ',
  description: '筋トレメモ',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
    <div className={classname.wrapper}>
      {children}
      <BottomNavigation />
    </div>
  )
}
