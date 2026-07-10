import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectorHooks } from "auto-zustand-selectors-hook";

type AuthState = {
  access: string | null;
  refresh: string | null;
  role: number | null;
  setAuth: (access: string, refresh: string, role: number) => void;
  clearAuth: () => void;
};

export const AUTH_STORAGE_KEY = "boshri-auth";

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      access: null,
      refresh: null,
      role: null,
      setAuth: (access, refresh, role) => set({ access, refresh, role }),
      clearAuth: () => set({ access: null, refresh: null, role: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        access: state.access,
        refresh: state.refresh,
        role: state.role,
      }),
    },
  ),
);

export const useAuthStore = createSelectorHooks(authStore);

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = authStore.getState().access;
  if (token) return token;

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { access?: string | null } };
    return parsed.state?.access ?? null;
  } catch {
    return null;
  }
}
