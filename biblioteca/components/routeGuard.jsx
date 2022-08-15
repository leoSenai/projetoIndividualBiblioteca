import {  useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from "universal-cookie";

export { RouteGuard };

function RouteGuard({ children }) {
    const router = useRouter();

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/'];
        const path = url.split('?')[0];
        const cookies = new Cookies()
        const access_token = cookies.get('access_token');
        if (access_token.length > 0 && !publicPaths.includes(path)) {
            router.push({
                pathname: '/',
                query: { returnUrl: router.asPath }
            });
        }
    }

    return (children);
}