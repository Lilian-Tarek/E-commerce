import axios from "axios";
const AxiosErrrorHandler = (error:unknown) => {
         if (axios.isAxiosError(error)) {
           return (
             error.response?.data.message || error.message
           );
         } else {
           return ("An unexpected error");
         }
}
export default AxiosErrrorHandler;