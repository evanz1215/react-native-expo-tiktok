import { supabase } from "@/lib/supabase";
import { PostInput } from "@/types/types";

type StorageInput = {
  fileName: string;
  fileExtension: string;
  fileBuffer: ArrayBuffer;
};

export const fetchPosts = async () => {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*), nrOfComments:comments(count)")
    .order("created_at", { ascending: true })
    .throwOnError();

  return data;
};

export const uploadVideoToStorage = async (storageProps: StorageInput) => {
  const { fileName, fileExtension, fileBuffer } = storageProps;

  const { data, error } = await supabase.storage
    .from("videos")
    .upload(fileName, fileBuffer, {
      contentType: `video/${fileExtension}`,
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from("videos")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

export const createPost = async (newPosts: PostInput) => {
  const { data, error } = await supabase
    .from("posts")
    .insert(newPosts)
    .throwOnError();

  if (error) {
    throw error;
  }

  return data;
};
