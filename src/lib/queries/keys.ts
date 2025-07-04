export const userKeys = {
  all: ["user"] as const,
  profile: (email: string) => [...userKeys.all, "profile", email] as const,
};
export const productKeys = {
  all: ["products"] as const,
  lists: (filters: Record<string, any> = {}) =>
    [...productKeys.all, "list", filters] as const,
  details: (slug: string) => [...productKeys.all, "detail", slug] as const,
};
export const categoryKeys = {
  all: ["categories"] as const,
};
export const brandKeys = {
  all: ["brands"] as const,
};
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  details: (id: string) => [...orderKeys.all, "detail", id] as const,
};