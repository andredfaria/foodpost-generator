import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ClientProfile = {
  id?: string;
  fk_id_user?: string;
  created_at?: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  instagram_link: string;
  business_name: string;
  segment: string;
};

export type Post = {
  id?: string;
  created_at?: string;
  client_id: string;
  prompt: string;
  image_url: string;
  status: boolean;
};

export async function getClientProfile(userId: string): Promise<ClientProfile | null> {
  const { data, error } = await supabase
    .from('client_profile')
    .select('*')
    .eq('fk_id_user', userId);
    
  if (error) {
    console.error('Error fetching client profile:', error);
    return null;
  }
  
  return data[0] as ClientProfile;
}

export async function saveClientProfile(profile: ClientProfile): Promise<ClientProfile | null> {
  try {   
    let result;
    if (profile.id) {
      const { id, ...updateData } = profile;
      result = await supabase
        .from('client_profile')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('client_profile')
        .insert(profile)
        .select()
        .single();
    }

    const { data, error } = result;
    
    if (error) {
      console.error('Error saving client profile:', error);
      return null;
    }
    
    return data as ClientProfile;
  } catch (error) {
    console.error('Unexpected error saving client profile:', error);
    return null;
  }
}

export async function uploadLogo(userId: string, file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/logo.${fileExt}`;
  
  const { error, data } = await supabase.storage
    .from('logos')
    .upload(fileName, file, { upsert: true });
  
  if (error) {
    console.error('Error uploading logo:', error);
    return null;
  }
  
  const { data: urlData } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName);
  
  return urlData.publicUrl;
}

export async function getPosts(userId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('client_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
  return data as Post[];
}

export async function savePost(post: Post): Promise<Post | null> {
  const { data, error } = await supabase
    .from('post')
    .insert(post)
    .select()
    .single();
  
  if (error) {
    console.error('Error saving post:', error);
    return null;
  }
  
  return data as Post;
}

export async function updatePostStatus(postId: string, status: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('post')
    .update({ status })
    .eq('id', postId);
  
  if (error) {
    console.error('Error updating post status:', error);
    return false;
  }
  
  return true;
}