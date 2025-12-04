import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | APE ARCHIVE',
    description: 'Privacy Policy for APE ARCHIVE.',
};

export default function PrivacyPage() {
    return (
        <div className="container max-w-4xl py-12 md:py-24">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="text-muted-foreground text-lg">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, such as to:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                            <li>Provide and deliver the products and services you request, process transactions and send you related information.</li>
                            <li>Send you technical notices, updates, security alerts and support and administrative messages.</li>
                            <li>Respond to your comments, questions and requests and provide customer service.</li>
                            <li>Communicate with you about products, services, offers, promotions, rewards, and events offered by APE ARCHIVE and others, and provide news and information we think will be of interest to you.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Sharing of Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                            <li>With third party vendors, consultants and other service providers who need access to such information to carry out work on our behalf.</li>
                            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation or legal process, or as otherwise required by any applicable law, rule or regulation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            APE ARCHIVE takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
