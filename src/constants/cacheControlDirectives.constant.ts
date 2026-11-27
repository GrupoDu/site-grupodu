export const CACHE_CONTROL_DIRECTIVES =
  "public, s-maxage=3600, max-age=604800 stale-while-revalidate=86400 stale-if-error=86400" as const;
