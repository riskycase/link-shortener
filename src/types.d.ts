interface FormMessage {
  _form?: string;
  _formError?: "UNAUTHENTICATED" | "DBERROR";
}

interface ShortLink {
  id: string;
  shortCode: string;
  longLink: string;
  redirectCount: number;
  disabled: boolean;
  disabledMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ShortLinkFormMessage extends FormMessage {
  shortCode?: string[] | undefined;
  longLink?: string[] | undefined;
}
