import { supabase } from "../_lib/supabase";

/**
 * Uploads an image file to Supabase Storage and returns its public URL.
 * @param file - The image file (File or Blob) to upload
 * @param bucket - The Supabase storage bucket name
 * @param path - The path (including filename) in the bucket
 * @returns {Promise<{ url: string | null; error: Error | null }>}
 */
export async function uploadImageToSupabase(
  file: File | Blob,
  bucket: string,
  path: string
): Promise<{ url: string | null; error: Error | null }> {
  try {
    // Validate file type
    if (
      file instanceof File &&
      !file.type.match(/^image\/(jpeg|png|gif|webp)$/)
    ) {
      return {
        url: null,
        error: new Error(
          `Invalid file type for ${
            file.name || "file"
          }. Supported: JPEG, PNG, GIF, WebP`
        ),
      };
    }

    // Sanitize path
    const sanitizedPath = path.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(sanitizedPath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return {
        url: null,
        error: new Error(
          `Upload failed for ${sanitizedPath}: ${uploadError.message}`
        ),
      };
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(sanitizedPath);
    const publicUrl = urlData?.publicUrl;

    if (!publicUrl) {
      return {
        url: null,
        error: new Error(`Failed to get public URL for ${sanitizedPath}`),
      };
    }

    return { url: publicUrl, error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      url: null,
      error: new Error(
        `Unexpected error uploading to ${bucket}: ${errorMessage}`
      ),
    };
  }
}
