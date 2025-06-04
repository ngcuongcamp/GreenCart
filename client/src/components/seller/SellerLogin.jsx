import React, { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import SellerAuthModal from './SellerAuthForm'

const SellerLogin = () => {

    const { isSeller, setIsSeller, navigate } = useAppContext()

    useEffect(() => {
        if (isSeller) {
            navigate('/seller')
        }
    }, [isSeller])

    return (
        <SellerAuthModal />
    )
}

export default SellerLogin