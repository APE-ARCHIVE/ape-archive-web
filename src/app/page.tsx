'use client';

import { HeroSection } from '@/components/home/hero-section';
//import { RecentNewsSection } from '@/components/home/recent-news-section';
//import {PopularSubjectsSection} from '@/components/home/popular-subjects-section';
//import { ContributorsSection } from '@/components/home/contributors-section';
//import {LatestUploadsSection} from '@/components/home/latest-uploads-section';
//import { WelcomeModal } from '@/components/home/welcome-modal';

export default function Home() {
    return (
        <div className='flex flex-col w-full min-h-screen'>
            {/* <WelcomeModal /> */}
            <HeroSection />
            {/* <RecentNewsSection /> */}
            {/* <PopularSubjectsSection/> */}
            {/* <LatestUploadsSection/> */}
            {/* <ContributorsSection /> */}
        </div>
    );
}
