import type { Path, FieldValues, UseFormRegister } from "react-hook-form";

type FormProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  type?: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formtext?: string;
  success?:string;
};


const Form = <TFieldValues extends FieldValues>({
  type = "text",
  register,
  name,
  error, onBlur, formtext,
  success
}: FormProps<TFieldValues>) => {
  const OnBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
    if (onBlur)
    {
      onBlur(e);
      register(name).onBlur(e)
    }
    else {
       register(name).onBlur(e);
    }
  }
  return (
    <>
      {formtext && (
        <label className="block text-sm font-medium text-gray-700">
          {formtext}
        </label>
      )}
      <input
        type={type}
        {...register(name)}
        placeholder={name}
        className={`
          w-full px-4 py-2 rounded-lg border
          focus:outline-none border-black
          ${error ? "border-primary border-3" : "border-3"}
          ${success ? "border-green-700 border-3" : "border-3"}
        `}
        onBlur={OnBlurHandler}
      />

      {error && (
        <p className="text-sm text-primary" role="alert">
          {error}
        </p>
      )}
      {success && (
        <label className="block text-sm font-medium text-green-700">
          {success}
        </label>
      )}
    </>
  );
};

export default Form;
