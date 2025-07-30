"use server";
import { createServerApi } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleWishlistAction(productId: string) {
  const session = await auth();
  if (!session?.user) {
    return { error: "You must be logged in." };
  }
  try {
    const api = await createServerApi();
    await api.post("/users/wishlist", { productId });
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/**`);
    revalidatePath("/wishlist");
    revalidatePath("/(main)", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.log(error);
    return { error: "Could not update wishlist." };
  }
}
