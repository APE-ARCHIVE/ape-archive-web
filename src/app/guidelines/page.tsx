import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community Guidelines | APE ARCHIVE',
    description: 'Community Guidelines for APE ARCHIVE.',
};

export default function GuidelinesPage() {
    return (
        <div className="container max-w-4xl py-12 md:py-24">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Community Guidelines</h1>
                    <p className="text-muted-foreground text-lg">
                        Help us keep APE ARCHIVE a safe and helpful place for everyone.
                    </p>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Be Respectful</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Treat all members of the community with respect. Harassment, hate speech, and personal attacks are strictly prohibited. We want to foster a positive and supportive environment for learning.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Share Quality Content</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            When uploading resources, ensure they are accurate, legible, and relevant. Do not upload copyrighted material that you do not have the right to share. Spam and irrelevant content will be removed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. No Academic Dishonesty</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Do not use APE ARCHIVE to cheat or facilitate cheating. This includes sharing exam answers during an exam or plagiarizing work.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Report Violations</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you see something that violates these guidelines, please report it to us immediately. We rely on our community to help maintain a safe and high-quality platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Consequences</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Violations of these guidelines may result in content removal, account suspension, or permanent banning from the platform.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
