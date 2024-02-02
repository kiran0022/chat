
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../types/supabase'

export default function SupabaseBrowserClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
