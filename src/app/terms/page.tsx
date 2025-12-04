import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | APE ARCHIVE',
    description: 'Terms of Service for using APE ARCHIVE.',
};

export default function TermsPage() {
    return (
        <div className="container max-w-4xl py-12 md:py-24">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                    <p className="text-muted-foreground text-lg">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing and using APE ARCHIVE, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            APE ARCHIVE provides users with access to a collection of educational resources, including study materials, past papers, and other related content. You understand and agree that the Service is provided "AS-IS" and that APE ARCHIVE assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You agree to use the website only for lawful purposes. You are prohibited from posting on or transmitting through the website any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable of any kind.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of APE ARCHIVE or its content suppliers and protected by international copyright laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
