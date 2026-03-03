import { z } from "zod";
const signup = z
  .object({
    firstName: z.string().min(1, { message: "First Name is Required" }),
    lastName: z.string().min(1, { message: "Last Name is Required" }),
    email: z.string().min(1, { message: "Email is Required" }).email(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, {
      message: "Password must be at least 8 characters and has special charachters"
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is Required"
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
type TFormInputs = z.infer<typeof signup>;
export { signup, type TFormInputs };