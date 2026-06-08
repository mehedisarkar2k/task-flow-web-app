"use client";

import { Camera, Sun, Moon, Settings, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useTeamMember } from "@/services/query/use-team";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useRemoveAvatarMutation,
  useChangePasswordMutation,
  useUpdatePreferencesMutation
} from "@/services/mutation/use-profile-mutations";
import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { getImageUrl } from "@/utils/image";
import { toast } from "sonner";
import { AvatarCropperModal } from "./_components/avatar-cropper";

export const ProfileScreen = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Professional details (sourced from the team self-profile, which has every field).
  const { data: ownProfile } = useTeamMember(user?.id ?? "");
  const [pro, setPro] = useState({
    jobTitle: "",
    department: "",
    location: "",
    phone: "",
    bio: "",
    skills: "",
  });
  const [proInit, setProInit] = useState(false);

  const [notifications, setNotifications] = useState({
    emailSummaries: true,
    mentionAlerts: true,
    marketingUpdates: false,
  });

  const updateProfile = useUpdateProfileMutation();
  const uploadAvatar = useUploadAvatarMutation();
  const removeAvatar = useRemoveAvatarMutation();
  const changePassword = useChangePasswordMutation();
  const updatePreferences = useUpdatePreferencesMutation();
  const { data: config } = useSystemConfig();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cropper state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password field visibility toggles
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user && !isInitialized) {
      // Use explicitly defined firstName/lastName if available,
      // fallback to name splitting only for legacy accounts.
      let finalFirstName = user.firstName || "";
      let finalLastName = user.lastName || "";

      if (!finalFirstName && !finalLastName && user.name) {
        const parts = user.name.split(" ");
        finalFirstName = parts[0];
        finalLastName = parts.slice(1).join(" ");
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        firstName: finalFirstName,
        lastName: finalLastName,
        email: user.email || "",
      });

      setNotifications({
        emailSummaries: user.emailSummaries ?? false,
        mentionAlerts: user.mentionAlerts ?? false,
        marketingUpdates: user.marketingUpdates ?? false,
      });

      setIsInitialized(true);
    }
  }, [user, isInitialized, user?.id]);

  useEffect(() => {
    if (ownProfile && !proInit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPro({
        jobTitle: ownProfile.jobTitle ?? "",
        department: ownProfile.department ?? "",
        location: ownProfile.location ?? "",
        phone: ownProfile.phone ?? "",
        bio: ownProfile.bio ?? "",
        skills: (ownProfile.skills ?? []).join(", "),
      });
      setProInit(true);
    }
  }, [ownProfile, proInit]);

  const userInitials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "??";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageSrc(imageUrl);
      setCropperOpen(true);
      // Reset input value so the same file can be selected again
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    setCropperOpen(false);
    uploadAvatar.mutate(croppedFile, {
      onSuccess: () => {
        if (selectedImageSrc) {
          URL.revokeObjectURL(selectedImageSrc);
        }
        setSelectedImageSrc(null);
        window.location.reload();
      }
    });
  };

  const handleSaveProfile = () => {
    updateProfile.mutate({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      jobTitle: pro.jobTitle.trim(),
      department: pro.department.trim(),
      location: pro.location.trim(),
      phone: pro.phone.trim(),
      bio: pro.bio.trim(),
      skills: pro.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }, {
      onSuccess: () => {
        window.location.reload();
      }
    });
  };

  const handleRemoveAvatar = () => {
    removeAvatar.mutate(undefined, {
      onSuccess: () => {
        window.location.reload();
      }
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updatePreferences.mutate({ theme: newTheme });
  };

  const handleNotificationChange = (field: keyof typeof notifications, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: checked }));
    updateProfile.mutate({
      [field]: checked,
    });
  };

  const handleUpdatePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    changePassword.mutate(
      {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
      }
    );
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto py-8 px-4 md:px-8 pb-24">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-1">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account details, preferences, and security settings.
        </p>
      </div>

      {/* Form Layout */}
      <div className="space-y-8">
        {/* Section: Account Information */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-4 mb-6">
            Account Information
          </h2>

          {/* Avatar Upload */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <div className="relative group cursor-pointer w-20 h-20 shrink-0" onClick={() => fileInputRef.current?.click()}>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleFileChange} />
              <div className="w-20 h-20 rounded-full border border-border overflow-hidden bg-muted flex items-center justify-center text-xl font-medium text-muted-foreground">
                {user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="Current Avatar"
                    className="w-full h-full object-cover"
                    src={getImageUrl(user.image, config?.profileImageBaseUrl) || undefined} 
                  />
                ) : (
                  userInitials
                )}
              </div>
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                {uploadAvatar.isPending ? <Loader2 className="animate-spin text-background size-6" /> : <Camera className="text-background size-6" />}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <Button variant="secondary" className="text-primary hover:bg-muted font-medium border border-border" onClick={() => fileInputRef.current?.click()} disabled={uploadAvatar.isPending}>
                  {uploadAvatar.isPending ? 'Uploading...' : 'Change Avatar'}
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={handleRemoveAvatar} disabled={removeAvatar.isPending || !user?.image}>
                  Remove
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </div>

          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                First Name
              </Label>
              <Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Last Name
              </Label>
              <Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Email Address
              </Label>
              <Input type="email" value={formData.email} disabled className="bg-muted text-muted-foreground" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Role
              </Label>
              <Input
                disabled
                value={user?.role || "MEMBER"}
                className="bg-muted border-dashed text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Contact your administrator to change your organizational role.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Job Title
              </Label>
              <Input
                value={pro.jobTitle}
                onChange={(e) => setPro({ ...pro, jobTitle: e.target.value })}
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Department
              </Label>
              <Input
                value={pro.department}
                onChange={(e) => setPro({ ...pro, department: e.target.value })}
                placeholder="e.g. Engineering"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Location
              </Label>
              <Input
                value={pro.location}
                onChange={(e) => setPro({ ...pro, location: e.target.value })}
                placeholder="e.g. London, UK"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Phone
              </Label>
              <Input
                value={pro.phone}
                onChange={(e) => setPro({ ...pro, phone: e.target.value })}
                placeholder="e.g. +44 20 1234 5678"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Bio
              </Label>
              <Textarea
                rows={3}
                value={pro.bio}
                onChange={(e) => setPro({ ...pro, bio: e.target.value })}
                placeholder="A short professional bio."
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Skills
              </Label>
              <Input
                value={pro.skills}
                onChange={(e) => setPro({ ...pro, skills: e.target.value })}
                placeholder="Comma-separated, e.g. React, TypeScript, Figma"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate skills with commas.</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-end">
            <Button onClick={handleSaveProfile} disabled={updateProfile.isPending}>
              {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </section>

        {/* Section: Preferences */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-4 mb-6">
            Preferences
          </h2>
          <div className="space-y-8">
            {/* Theme Toggle */}
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Interface Theme
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select or customize your UI theme.
              </p>
              <div className="flex gap-4">
                <label className="relative flex flex-col items-center cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="theme"
                    type="radio"
                    value="light"
                    checked={theme === "light"}
                    onChange={() => handleThemeChange("light")}
                  />
                  <div className="w-24 h-16 rounded border-2 border-border peer-checked:border-primary bg-background flex items-center justify-center mb-2 transition-colors">
                    <Sun className="text-primary size-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Light
                  </span>
                </label>
                <label className="relative flex flex-col items-center cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="theme"
                    type="radio"
                    value="dark"
                    checked={theme === "dark"}
                    onChange={() => handleThemeChange("dark")}
                  />
                  <div className="w-24 h-16 rounded border-2 border-border peer-checked:border-primary bg-foreground flex items-center justify-center mb-2 transition-colors">
                    <Moon className="text-background size-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Dark
                  </span>
                </label>
                <label className="relative flex flex-col items-center cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="theme"
                    type="radio"
                    value="system"
                    checked={theme === "system"}
                    onChange={() => handleThemeChange("system")}
                  />
                  <div className="w-24 h-16 rounded border-2 border-border peer-checked:border-primary bg-gradient-to-br from-background to-foreground flex items-center justify-center mb-2 transition-colors">
                    <Settings className="text-muted-foreground size-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    System
                  </span>
                </label>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-base font-medium text-foreground mb-1">
                Notifications
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose what we notify you about.
              </p>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <Checkbox
                      checked={notifications.emailSummaries}
                      onCheckedChange={(c) => handleNotificationChange("emailSummaries", c as boolean)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Email Summaries
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Daily digest of project activity and upcoming deadlines.
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <Checkbox
                      checked={notifications.mentionAlerts}
                      onCheckedChange={(c) => handleNotificationChange("mentionAlerts", c as boolean)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Mention Alerts
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Immediate notification when someone tags you in a task or comment.
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <Checkbox
                      checked={notifications.marketingUpdates}
                      onCheckedChange={(c) => handleNotificationChange("marketingUpdates", c as boolean)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Marketing Updates
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Occasional emails about new features and product news.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Security */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-border"></div>
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-4 mb-6">
            Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Current Password
              </Label>
              <div className="relative md:w-1/2">
                <Input
                  type={showCurrentPw ? "text" : "password"}
                  className="pr-10"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showCurrentPw ? "Hide password" : "Show password"}
                >
                  {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showNewPw ? "text" : "password"}
                  className="pr-10"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showNewPw ? "Hide password" : "Show password"}
                >
                  {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPw ? "text" : "password"}
                  className="pr-10"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPw ? "Hide password" : "Show password"}
                >
                  {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-4 border-t border-border gap-4">
            <p className="text-xs text-muted-foreground">
              Last profile update: <span className="font-mono">{user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}</span>
            </p>
            <Button
              variant="secondary"
              className="border border-border"
              onClick={handleUpdatePassword}
              disabled={changePassword.isPending}
            >
              {changePassword.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {changePassword.isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </section>
      </div>

      <AvatarCropperModal
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        imageSrc={selectedImageSrc}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};
