import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CheckoutArea from '@/components/checkout/checkout-area';

const CheckoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticate = Cookies.get("userInfo");
    // If not authenticated, redirect to checkout directly (skip login check)
    if (!isAuthenticate) {
      // Optionally, you can keep this for setting a default user state or other actions
      console.log("User not authenticated, skipping login...");
    }
  }, [router]);

  return (
    <Wrapper>
      <SEO pageTitle="popote Oder" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Order Now" subtitle="Order" bg_clr={true} />
      <CheckoutArea />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default CheckoutPage;
