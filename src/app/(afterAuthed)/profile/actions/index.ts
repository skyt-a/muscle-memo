'use server'

import { createClient } from '@/lib/supabase/server'

export const logoutAction = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
}
