import Heading from "@components/commons/Heading";
import Form from "@components/form/Form";
import { Navigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";
import { IoIosWarning } from "react-icons/io";
const Login = () => {
  const {
    submitForm,
    searchParams,
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
        <p className="font-bold text-center text-2xl text-green-600 my-3">
          Account created successfully
        </p>
      )}

      {searchParams.get("message") === "login_required" && (
        <p className="font-bold text-center text-xl text-red-500 flex justify-center items-center gap-2 my-3">
          <span className="inline-block">
            <IoIosWarning className="text-5xl" />
          </span>
          Login required
        </p>
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
