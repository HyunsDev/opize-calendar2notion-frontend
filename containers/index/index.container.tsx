import { useEffect, useState } from 'react';
import { IndexHeroSection } from './components/hero.section';
import { useUser } from '../../hooks/useUser';
import { IndexFeatureSection } from './components/feature.section';
import { IndexPlanSection } from './components/plan.section';
import { Flex } from 'opize-design-system';
import { IndexLastSection } from './components/lastBlock.section';

export const IndexContainer = () => {
    const [isLogin, setIsLogin] = useState(false);
    const { user, isLoading } = useUser({ allowNonLogin: true });

    useEffect(() => {
        setIsLogin(!!localStorage.getItem('token') || !!user);
    }, [user]);

    useEffect(() => {
        if (!isLoading && user) setIsLogin(true);
    }, [isLoading, user]);

    return (
        <>
            <IndexHeroSection isLogin={isLogin} />
            <Flex.Column gap="200px">
                <IndexFeatureSection />
                <IndexPlanSection />
                <IndexLastSection isLogin={isLogin} />
            </Flex.Column>
        </>
    );
};
