import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | APE ARCHIVE',
    description: 'Cookie Policy for APE ARCHIVE.',
};

export default function CookiePolicyPage() {
    return (
        <div className="container max-w-4xl py-12 md:py-24">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
                    <p className="text-muted-foreground text-lg">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. The Cookies We Set</h2>
                        <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                            <li>
                                <strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.
                            </li>
                            <li>
                                <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Third Party Cookies</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                            <li>
                                This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
