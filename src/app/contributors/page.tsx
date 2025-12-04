import { Metadata } from 'next';
import { Github } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contributors | APE ARCHIVE',
    description: 'Meet the contributors who made APE ARCHIVE possible.',
};

const contributors = [
    { name: 'Oshan Avishka', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Dilini Silva', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Banuka', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Kavindi Samaraweera', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Kavindu Jayasundara', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Lahiru', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Nipun Theekshana', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Sasuni Wijerathne', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Shehan', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Vidura', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Dhanika', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Isuru Rathnayaka', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Pulindu Dinal Godage', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Ruvinda Shaluka', githubProfile: 'https://github.com/APE-ARCHIVE' },
    { name: 'Saumya Sithumini', githubProfile: 'https://github.com/APE-ARCHIVE' },
];

export default function ContributorsPage() {
    return (
        <div className="container max-w-4xl py-12 md:py-24">
            <div className="space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Our Contributors</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        APE ARCHIVE is an open-source project built by a community of passionate developers and students. We thank everyone who has contributed to making education more accessible.
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <Link
                        href="https://github.com/APE-ARCHIVE"
                        target="_blank"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    >
                        <Github className="mr-2 h-4 w-4" />
                        View Our GitHub Repository
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                    {contributors.map((contributor, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                <Github className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{contributor.name}</h3>
                                <p className="text-sm text-muted-foreground">Contributor</p>
                            </div>
                            <Link
                                href={contributor.githubProfile}
                                target="_blank"
                                className="text-sm text-primary hover:underline"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
