import { supabase } from "@/lib/supabase";

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, user:profiles(*), nrOfComments:comments(count)")
    .order("created_at", { ascending: true })
    .throwOnError();

  return data;
};
