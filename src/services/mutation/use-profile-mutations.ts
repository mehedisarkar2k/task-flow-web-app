import { useMutation } from '@tanstack/react-query';
import { profileApi, UpdateProfileData } from '@/services/api/profile';
import { uploadFileToPresignedUrl } from '@/lib/upload';
import { changePassword } from '@/lib/auth-client';
import { toast } from 'sonner';

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateProfileData) => profileApi.updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const result = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: false,
      });
      if (result.error) throw new Error(result.error.message ?? 'Failed to change password');
      return result;
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update password');
    },
  });
};

export const useUpdatePreferencesMutation = () => {
  return useMutation({
    mutationFn: async (data: { theme: string }) => {
      const themeValue = data.theme.toUpperCase() as "LIGHT" | "DARK" | "SYSTEM";
      return profileApi.updateProfile({ theme: themeValue });
    },
    onSuccess: () => {
      toast.success('Preferences saved');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save preferences');
    },
  });
};

export const useUploadAvatarMutation = () => {
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
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload avatar');
    },
  });
};

export const useRemoveAvatarMutation = () => {
  return useMutation({
    mutationFn: () => profileApi.removeAvatar(),
    onSuccess: () => {
      toast.success('Avatar removed');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove avatar');
    },
  });
};

