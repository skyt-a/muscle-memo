'use client'
import { supabase } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export const LoginButton = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google']}
      redirectTo={
        typeof window !== undefined
          ? `${window.location.origin}/api/auth/callback`
          : undefined
      }
      localization={{
        variables: {
          sign_in: {
            email_label: 'メールアドレス',
            email_input_placeholder: 'メールアドレス',
            password_label: 'パスワード',
            password_input_placeholder: 'パスワード',
            button_label: 'ログイン',
            link_text: 'アカウントをお持ちの場合はこちら',
          },
          sign_up: {
            email_label: 'メールアドレス',
            email_input_placeholder: 'メールアドレス',
            password_label: 'パスワード',
            password_input_placeholder: 'パスワード',
            button_label: 'ログイン',
            link_text: 'アカウントをお持ちでない場合はこちら',
          },
          forgotten_password: {
            email_label: 'メールアドレス',
            email_input_placeholder: 'メールアドレス',
            link_text: 'パスワードをお忘れですか？',
            button_label: 'パスワードをリセット',
          },
        },
      }}
    />
  )
}
