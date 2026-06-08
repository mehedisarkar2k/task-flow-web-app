export async function uploadFileToPresignedUrl(
  url: string, 
  file: File, 
  method: string = 'PUT', 
  headers: Record<string, string> = {}
) {
  const response = await fetch(url, {
    method,
    body: file,
    headers: {
      'Content-Type': file.type,
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to storage');
  }

  return response;
}
