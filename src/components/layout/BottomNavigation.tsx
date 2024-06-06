// app/tabs/page.tsx
'use client'
import { Tab, Tabs } from '@nextui-org/tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from './BottomNavigation.module.css'

export const BottomNavigation = () => {
  const pathname = usePathname()

  return (
    <div className={style.wrapper}>
      <Tabs aria-label="Options" selectedKey={pathname} fullWidth>
        <Tab key="calendar" title="カレンダー" href="/calendar" as={Link} />
        <Tab key="exercise" title="エクササイズ" href="/exercise" as={Link} />
        <Tab key="profile" title="プロフィール" href="/profile" as={Link} />
      </Tabs>
    </div>
  )
}
