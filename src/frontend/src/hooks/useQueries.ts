import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

let counter = 0;
function generateId(): string {
  counter += 1;
  return `contact-${Date.now()}-${counter}`;
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const id = generateId();
      await actor.submitContactRequest(
        id,
        data.name,
        data.phone,
        data.email,
        data.message,
      );
    },
  });
}
