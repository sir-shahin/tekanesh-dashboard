import { useEffect, useState } from "react";

import { authStore } from "./auth-store";

export { authStore, useAuthStore, getStoredAccessToken, AUTH_STORAGE_KEY } from "./auth-store";

export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const finishHydration = () => setHydrated(true);

    if (authStore.persist.hasHydrated()) {
      finishHydration();
      return;
    }

    const unsub = authStore.persist.onFinishHydration(finishHydration);
    authStore.persist.rehydrate();

    return unsub;
  }, []);

  return hydrated;
}
