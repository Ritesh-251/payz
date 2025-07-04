import { z } from "zod";

export const sendMoneyValidator = z.object({
  to: z.string().min(1, "Receiver username is required"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number"
    })
    .positive("Amount must be greater than 0"),
});
