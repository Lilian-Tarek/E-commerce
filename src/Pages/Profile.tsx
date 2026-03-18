import { useAppSelector } from '@store/hooks'
const Profile = () => {
  const userFullInfo = useAppSelector(state => state.AuthSlice.user);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Account</h1>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between border-b pb-2">
          <span className="font-medium">First Name:</span>
          <span>{userFullInfo?.firstName || "-"}</span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-medium">Last Name:</span>
          <span>{userFullInfo?.lastName || "-"}</span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-medium">Email:</span>
          <span>{userFullInfo?.email || "-"}</span>
        </li>
      </ul>
    </div>
  );
}

export default Profile
