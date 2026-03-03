import { z } from "zod";
const signin = z.object({
  email: z.string().min(1, { message: "Email is Required" }).email(),
  password: z.string().min(1, { message: "Password is Required" })
});
type TFormInputs = z.infer<typeof signin>;
export { signin, type TFormInputs };