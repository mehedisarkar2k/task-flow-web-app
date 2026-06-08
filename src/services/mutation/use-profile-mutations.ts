import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi, UpdateProfileData } from '@/services/api/profile';
import { uploadFileToPresignedUrl } from '@/lib/upload';
import { toast } from 'sonner';

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => profileApi.updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};

export const useUploadAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const data = await profileApi.requestAvatarUploadUrl({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      });

      if (!data) throw new Error('Failed to get upload URL');

      const { uploadUrl, fileKey, method, headers } = data;

      await uploadFileToPresignedUrl(uploadUrl, file, method, headers);

      const result = await profileApi.confirmAvatarUpload(fileKey);
      if (!result?.image) throw new Error('Failed to confirm avatar upload');
      return result.image;
    },
    onSuccess: () => {
      toast.success('Avatar updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to upload avatar');
    },
  });
};

export const useRemoveAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileApi.removeAvatar(),
    onSuccess: () => {
      toast.success('Avatar removed');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove avatar');
    },
  });
};
