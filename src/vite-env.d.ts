/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_TEMPLE_MAP_URL?: string;
  readonly VITE_RESIDENCE_MAP_URL?: string;
  readonly VITE_BRIDE_CONTACT_1?: string;
  readonly VITE_BRIDE_CONTACT_2?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
