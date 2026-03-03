
import { useForm } from "react-hook-form";
import Heading from "@components/commons/Heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin, type TFormInputs } from "@validation/LoginSchema";
import Form from "@components/form/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import actAuthLogin from "@store/Act/ActLogin";
import type { SubmitHandler } from "react-hook-form";
import { useAppSelector } from "@store/hooks";
import { ResetUi } from "@store/Auth/AuthSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";
const Login = () => {
  const {
    submitForm,
    searchParams,
    setSearchParams,
    register,
    handleSubmit,
    errors,
    error,
    loading,
    accessToken
  } = useLogin();
   if (accessToken) {
     return <Navigate to="/" />;
   }
  return (
    <>
      <Heading title="User Login" />
      {searchParams.get("message") === "account_created" && (
        <p className="success">Account created successfully</p>
      )}

      {searchParams.get("message") === "login_required" && (
        <p className="error">Login required</p>
      )}
      <div className=" flex items-center justify-center px-4">
        <form
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5 my-5 border-2 border-primary"
          onSubmit={handleSubmit(submitForm)}
        >
          <Form
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <Form
            type="password"
            name="password"
            register={register}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading === "pending" ? "loading" : "Submit"}
          </button>
          {error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </form>
      </div>
    </>
  );
}

export default Login
