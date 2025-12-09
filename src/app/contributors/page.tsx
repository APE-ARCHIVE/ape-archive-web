'use client';

import { Github } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const contributors = [
    { name: "Nipun Hemal", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765043004/Nipun_Hemal_ommk9s.jpg" },
    { name: "Oshan Avishka", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042002/Oshan_Avishka_bmtffr.jpg" },
    { name: "Shehan Anujaya", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765043003/Shehan_Anujaya_dotkyn.jpg" },
    { name: "Dilini Chamika", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765043243/Dilini_Chamika_huwaaw.jpg" },
    { name: "Bhanuka Viraj", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042009/Bhanuka_Viraj_lwxjvn.png" },
    { name: "Vidura Prayadarshana", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042001/Visura_Priyadharshana_nkhmkj.jpg" },
    { name: "Sasuni Wijerathne", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042011/Sasuni_Wijerathne_jdjpq6.jpg" },
    { name: "Sithumini Dulanjalee", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042002/Sithumini_Dulanjalee_akuxvk.jpg" },
    { name: "Ranuthi Pehansa", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042003/Ranuthi_pehansa_Peiris.jpeg_qktvlq.jpg" },
    { name: "Yasiru Sahan", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042013/Yasiru_sahan.jpeg_io9q8t.jpg" },
    { name: "Isuru Rathnajake", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042010/Isuru_Rathnajake_niyzhb.jpg" },
    { name: "Saumya Divyanjalee", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042000/Saumya_Divyanjalee.jpeg_edva5o.jpg" },
    { name: "Pulindu Dinel", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042005/Pulindu_Dinel_tuibhs.jpg" },
    { name: "Manuja Ravishka", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042004/Manuja_Ravishka_oth84v.jpg" },
    { name: "Imasha Dewmi", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042003/Imasha_Dewmi_zn6fu3.jpg" },
    { name: "Dhanika D Suranga", githubProfile: "https://res.cloudinary.com/dsuj0mjxy/image/upload/v1765042003/Dhanika_D_Suranga_ydnqip.jpg" },
]


// Split contributors into rows for the river effect
const row1 = contributors.slice(0, 5);
const row2 = contributors.slice(5, 10);
const row3 = contributors.slice(10, 16);

export default function ContributorsPage() {
    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="py-8 md:py-16 px-4">
                <div className="space-y-4 md:space-y-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        Meet Our Amazing
                        <br />
                        <span className="text-primary">Contributors</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
                        Passionate developers and students building the future of education in Sri Lanka
                    </p>
                    <Link href="https://github.com/APE-ARCHIVE" target="_blank">
                        <Button size="lg" className="gap-2 mt-2">
                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">View GitHub</span>
                        </Button>
                    </Link>
                </div>
            </div>



            {/* River Flowing Bubbles Section */}
            <div className="relative w-full overflow-hidden py-4 sm:py-8">
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Row 1 - flows right to left */}
                <div className="flex mb-4 sm:mb-6 md:mb-8 animate-marquee-slow">
                    <div className="flex gap-4 sm:gap-6 md:gap-8 pr-4 sm:pr-6 md:pr-8">
                        {[...row1, ...row1, ...row1, ...row1].map((contributor, index) => (
                            <BubbleCard key={`r1-${index}`} contributor={contributor} index={index} />
                        ))}
                    </div>
                </div>

                {/* Row 2 - flows right to left (faster) */}
                <div className="flex mb-4 sm:mb-6 md:mb-8 animate-marquee-fast">
                    <div className="flex gap-4 sm:gap-5 md:gap-6 pr-4 sm:pr-5 md:pr-6">
                        {[...row2, ...row2, ...row2, ...row2].map((contributor, index) => (
                            <BubbleCard key={`r2-${index}`} contributor={contributor} index={index} />
                        ))}
                    </div>
                </div>

                {/* Row 3 - flows right to left (medium speed) */}
                <div className="flex animate-marquee-medium">
                    <div className="flex gap-5 sm:gap-7 md:gap-10 pr-5 sm:pr-7 md:pr-10">
                        {[...row3, ...row3, ...row3, ...row3].map((contributor, index) => (
                            <BubbleCard key={`r3-${index}`} contributor={contributor} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function BubbleCard({ contributor, index = 0 }: { contributor: { name: string; githubProfile: string }; index?: number }) {
    // Different animation delays for natural look
    const delays = ['0s', '0.5s', '1s', '1.5s', '2s'];
    const delay = delays[index % delays.length];

    return (
        <Link
            href={contributor.githubProfile}
            target="_blank"
            className="group flex flex-col items-center gap-1 sm:gap-2 flex-shrink-0"
        >
            <div
                className="
                    w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                    rounded-full 
                    bg-gradient-to-br from-card via-card to-primary/20
                    border-2 border-border/50
                    shadow-lg shadow-primary/10
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:scale-110 
                    group-hover:border-primary
                    group-hover:shadow-xl
                    group-hover:shadow-primary/30
                    animate-bubble
                    relative overflow-hidden
                "
                style={{ animationDelay: delay }}
            >
                <Image
                    src={contributor.githubProfile}
                    alt={contributor.name}
                    fill
                    className="object-cover"
                />
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap max-w-[60px] sm:max-w-[80px] md:max-w-none truncate text-center">
                {contributor.name}
            </span>
        </Link>
    );
}
