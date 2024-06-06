'use client'
const LoginButton = dynamic(
  () =>
    import('@/app/(auth)/login/components/LoginButton').then(
      (module) => module.LoginButton,
    ) as any,
  { ssr: false },
)
import dynamic from 'next/dynamic'
import styled from './page.module.css'
export default function Login() {
  return (
    <main className={styled.wrapper}>
      <LoginButton />
    </main>
  )
}
