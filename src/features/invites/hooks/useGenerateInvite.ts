"use client";

import { useCallback, useState } from "react";
import { generateShareToken } from "../services/inviteApi";

type InviteResult = {
  token: string;
  shareLink?: string;
};

export function useGenerateInvite() {
  const [invite, setInvite] = useState<InviteResult | null>(null);

  const createInvite = useCallback(async (calendarId: string) => {
    const result = await generateShareToken(calendarId);
    setInvite(result);
    return result as InviteResult;
  }, []);

  return { invite, createInvite };
}
