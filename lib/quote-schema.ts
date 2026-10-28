import { z } from "zod";

export const LOAD_SIZES = [
  { value: "quarter", label: "¼ Load" },
  { value: "half", label: "½ Load" },
  { value: "full", label: "Full Load" },
  { value: "not_sure", label: "Not sure" },
] as const;

export type LoadSize = (typeof LOAD_SIZES)[number]["value"];

export const quoteSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(80, "Last name is too long"),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(40, "Phone number is too long")
    .regex(/^[\d\s()+.\-]+$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address")),
  address: z
    .string()
    .trim()
    .min(2, "Address or city is required")
    .max(200, "Address is too long"),
  loadSize: z.enum(
    ["quarter", "half", "full", "not_sure"],
    "Select a load size",
  ),
  description: z
    .string()
    .trim()
    .min(10, "Please add a short description (at least 10 characters)")
    .max(2000, "Description is too long"),
  preferredDate: z
    .string()
    .trim()
    .max(40, "Preferred date is too long")
    .optional()
    .or(z.literal("")),
  website: z.string().optional(), // honeypot
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type QuoteFieldErrors = Partial<
  Record<keyof QuoteInput | "form", string>
>;

export type QuoteActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: QuoteFieldErrors;
};

export const initialQuoteState: QuoteActionState = {
  ok: false,
};

export function loadSizeLabel(value: LoadSize): string {
  return LOAD_SIZES.find((item) => item.value === value)?.label ?? value;
}
