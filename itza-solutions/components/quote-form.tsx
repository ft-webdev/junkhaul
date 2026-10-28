"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { submitQuote } from "@/app/quote/actions";
import {
  initialQuoteState,
  LOAD_SIZES,
  type QuoteFieldErrors,
} from "@/lib/quote-schema";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
};

function Field({ id, label, error, required, optional, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
        {optional ? (
          <span className="ml-1 font-normal text-muted">(optional)</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "min-h-12 w-full rounded-md border border-border bg-white px-4 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-accent";

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(
    submitQuote,
    initialQuoteState,
  );
  const [clientErrors, setClientErrors] = useState<QuoteFieldErrors>({});

  if (state.ok) {
    return (
      <div
        className="animate-soft-rise rounded-xl border border-border bg-white p-8 text-center sm:p-10"
        role="status"
      >
        <p className="text-2xl font-black tracking-tight text-foreground">
          Thanks — we’ll be in touch shortly.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Your request is in. We’ll follow up with a clear quote and next steps.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const errors = { ...clientErrors, ...state.fieldErrors };

  function validateClient(formData: FormData): boolean {
    const next: QuoteFieldErrors = {};
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const loadSize = String(formData.get("loadSize") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();

    if (!firstName) next.firstName = "First name is required";
    if (!lastName) next.lastName = "Last name is required";
    if (phone.length < 7) next.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address";
    }
    if (address.length < 2) next.address = "Address or city is required";
    if (!loadSize) next.loadSize = "Select a load size";
    if (description.length < 10) {
      next.description =
        "Please add a short description (at least 10 characters)";
    }

    setClientErrors(next);
    return Object.keys(next).length === 0;
  }

  return (
    <form
      action={formAction}
      className="relative rounded-xl border border-border bg-white p-5 sm:p-8"
      noValidate
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        if (!validateClient(formData)) {
          event.preventDefault();
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="firstName"
          label="First name"
          required
          error={errors.firstName}
        >
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            className={inputClass}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
        </Field>
        <Field
          id="lastName"
          label="Last name"
          required
          error={errors.lastName}
        >
          <input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            className={inputClass}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="company" label="Company" optional error={errors.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={inputClass}
            aria-invalid={Boolean(errors.company)}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="address"
          label="Address or city"
          required
          error={errors.address}
        >
          <input
            id="address"
            name="address"
            autoComplete="street-address"
            placeholder="Dallas, TX or full street address"
            className={inputClass}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="loadSize" label="Load size" required error={errors.loadSize}>
          <select
            id="loadSize"
            name="loadSize"
            defaultValue=""
            className={inputClass}
            aria-invalid={Boolean(errors.loadSize)}
            aria-describedby={errors.loadSize ? "loadSize-error" : undefined}
          >
            <option value="" disabled>
              Select load size
            </option>
            {LOAD_SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="preferredDate"
          label="Preferred date"
          optional
          error={errors.preferredDate}
        >
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            className={inputClass}
            aria-invalid={Boolean(errors.preferredDate)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="description"
          label="What can we make disappear for you?"
          required
          error={errors.description}
        >
          <textarea
            id="description"
            name="description"
            rows={5}
            className={`${inputClass} min-h-[140px] resize-y py-3`}
            placeholder="Furniture, construction debris, garage cleanout…"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
        </Field>
      </div>

      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.message && !state.ok ? (
        <p
          className="mt-5 rounded-md border border-accent/30 bg-[color-mix(in_srgb,var(--accent)_8%,white)] px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Request a Quote"
        )}
      </button>
    </form>
  );
}
