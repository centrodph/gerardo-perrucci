---
slug: nextjs/nextjs-14-nextjs-13-handling-forms
title: "Handling Forms in Next.js 13+ with Server Actions"
authors: [me]
tags: [React, Nextjs, Forms]
---


# Handling Forms in Next.js 13+ with Server Actions

Next.js 13 introduced Server Actions, which provide a powerful way to handle form submissions directly on the server. 

This article will guide you through creating a form, handling submissions, showing loading states, and applying validations.

<!-- truncate -->


## Versions


- Next.js: 13.4 or later
- Material-UI: 5.x
- React: 18.x
- Zod (for validation): 3.x



## Setting Up the Form


First, let's create a form component using Material-UI:


```typescript
import { Button, TextField, Stack } from "@mui/material";
import { useFormStatus } from "react-dom";

export function AccountEditForm({ account, onSubmit }) {
  const { pending } = useFormStatus();

  return (
    <form action={onSubmit}>
      <Stack spacing={2}>
        <TextField
          name="name"
          label="Account Name"
          defaultValue={account.name}
          required
        />
        <TextField
          name="balance"
          label="Balance"
          type="number"
          defaultValue={account.balance}
          required
        />
        <Button type="submit" variant="contained" disabled={pending}>
          {pending ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>
    </form>
  );
}
```


## Creating a Server Action


Next, let's create a server action to handle the form submission:


```typescript
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supaServerClient } from "@/utils/supabase/server";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  balance: z.number().min(0, "Balance must be non-negative"),
});

export async function updateAccount(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const balance = parseFloat(formData.get("balance") as string);

  const validatedData = schema.safeParse({ name, balance });

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const supabase = supaServerClient();
  const { error } = await supabase
    .from("account")
    .update({ name, balance })
    .eq("id", id);

  if (error) {
    return { error: "Failed to update account" };
  }

  revalidatePath("/dashboard/accounts");
  return { success: true };
}
```



## Integrating the Form and Action


Now, let's update the page component to use the form and action:


```typescript
import { AccountEditForm } from "@/components/AccountEditForm";
import { updateAccount } from "./actions";
import { supaServerClient } from "@/utils/supabase/server";
import { Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import { paths } from "@/paths";

// ... other imports and interfaces

async function ServerData({ params }: PageProps) {
  const supabase = supaServerClient();
  const { data: account, error } = await supabase
    .from("account")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return <Typography color="error">Failed to load account</Typography>;
  }

  return <AccountEditForm account={account} onSubmit={updateAccount} />;
}

export default function PageEditForm(props: PageProps) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Edit Account</Typography>
        <Button
          LinkComponent={Link}
          variant="outlined"
          href={paths.dashboard.accounts}
        >
          Back
        </Button>
      </Stack>
      <ServerData {...props} />
    </Stack>
  );
}
```


## Handling Loading States


The `useFormStatus` hook from `react-dom` is used in the `AccountEditForm` component to handle the loading state. The submit button text and disabled state are updated based on the `pending` status.



## Applying Validations


We use Zod for server-side validation in the `updateAccount` action. Client-side validation can be added using a library like Formik or react-hook-form if needed.


## Error Handling


The server action returns errors if validation fails or if the database update fails. You can enhance the `AccountEditForm` component to display these errors:


```typescript
import { useState } from "react";
import { Button, TextField, Stack, Alert } from "@mui/material";
import { useFormStatus } from "react-dom";

export function AccountEditForm({ account, onSubmit }) {
  const { pending } = useFormStatus();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    const result = await onSubmit(formData);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <form action={handleSubmit}>
      {error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
      {/* ... form fields ... */}
    </form>
  );
}
```


## Conclusion


This approach leverages Next.js 13+ Server Actions to handle form submissions efficiently. It provides a seamless way to manage server-side operations, loading states, and validations while keeping the client-side code minimal.


Remember to handle errors gracefully and provide clear feedback to users. You can further enhance this setup by adding client-side validations and more sophisticated error handling as needed for your specific use case.