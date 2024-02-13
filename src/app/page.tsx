import ChatAbout from "@/components/ChatAbout";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ListMessages from "@/components/ListMessages";
import InitUser from "@/lib/store/InitUser";
import SupabaseServerClient from "@/lib/supabase/server";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  const supabase = await SupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  // console.log(data);

  //wb change
  // t
  // if (data.session) {
  //   await fetch(process.env.DISCORD_WEBHOOK!, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       content: `${data.session?.user.email} just logged in`,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
  //wb change

  return (
    <>
      <main className=" max-w-3xl mx-auto md:py-10 h-screen">
        <div className=" h-full border rounded-md flex flex-col relative">
          <ChatHeader user={data.session?.user} />

          {data.session?.user ? (
            <Suspense fallback={<Loading />}>
              <ChatMessages />
              <ChatInput />
            </Suspense>
          ) : (
            <ChatAbout />
          )}
        </div>
      </main>

      <InitUser user={data.session?.user} />
    </>
  );
}
