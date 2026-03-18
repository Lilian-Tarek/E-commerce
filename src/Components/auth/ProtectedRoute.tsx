import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@store/hooks'
// To prevent logging to cart and wishlist when user is not signed in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAppSelector(state => state.AuthSlice);
    if (!accessToken)
    {
    return  <Navigate to="/login?message=login_required"/>
    }
  return (
      <>
          { children}</>
  )
}

export default ProtectedRoute
