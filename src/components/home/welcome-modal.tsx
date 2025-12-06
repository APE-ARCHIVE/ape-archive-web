'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, FileText, Heart, Sparkles, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

type Language = 'en' | 'si' | 'ta';

const STORAGE_KEY = 'ape-archive-welcome-dismissed';

// Translations
const translations = {
    en: {
        welcome: 'Welcome to',
        title: 'APE Archive',
        subtitle: 'Your Free Educational Resource Hub',
        description: 'APE Archive is a community-driven platform dedicated to providing free, high-quality educational resources for all Sri Lankan students.',
        benefits: [
            {
                icon: FileText,
                title: 'Free Resources',
                description: 'Access past papers, notes, syllabi, and study materials completely free.'
            },
            {
                icon: Users,
                title: 'Community Driven',
                description: 'Built by students and teachers who believe in sharing knowledge.'
            },
            {
                icon: Heart,
                title: 'Equal Opportunity',
                description: 'Quality education resources should be accessible to everyone.'
            }
        ],
        contribute: 'Have resources to share? Your contribution can help thousands of students succeed!',
        getStarted: 'Get Started',
        dontShowAgain: "Don't show this again"
    },
    si: {
        welcome: 'සාදරයෙන් පිළිගනිමු',
        title: 'APE Archive',
        subtitle: 'ඔබේ නිදහස් අධ්‍යාපන සම්පත් මධ්‍යස්ථානය',
        description: 'APE Archive යනු ශ්‍රී ලංකාවේ සියලුම සිසුන් සඳහා නොමිලේ, උසස් තත්ත්වයේ අධ්‍යාපන සම්පත් සැපයීමට කැපවූ ප්‍රජා-මුලික වේදිකාවකි.',
        benefits: [
            {
                icon: FileText,
                title: 'නොමිලේ සම්පත්',
                description: 'පසුගිය ප්‍රශ්න පත්‍ර, සටහන්, විෂය නිර්දේශ සහ අධ්‍යයන ද්‍රව්‍ය සම්පූර්ණයෙන්ම නොමිලේ ලබා ගන්න.'
            },
            {
                icon: Users,
                title: 'ප්‍රජා මුලික',
                description: 'දැනුම බෙදා ගැනීමට විශ්වාස කරන සිසුන් සහ ගුරුවරුන් විසින් ගොඩනගන ලදී.'
            },
            {
                icon: Heart,
                title: 'සමාන අවස්ථා',
                description: 'ගුණාත්මක අධ්‍යාපන සම්පත් සැමට ප්‍රවේශ විය යුතුය.'
            }
        ],
        contribute: 'බෙදා ගැනීමට සම්පත් තිබේද? ඔබේ දායකත්වය දහස් ගණන් සිසුන්ට සාර්ථක වීමට උපකාරී වේ!',
        getStarted: 'ආරම්භ කරන්න',
        dontShowAgain: 'මෙය නැවත නොපෙන්වන්න'
    },
    ta: {
        welcome: 'வரவேற்கிறோம்',
        title: 'APE Archive',
        subtitle: 'உங்கள் இலவச கல்வி வள மையம்',
        description: 'APE Archive என்பது இலங்கையின் அனைத்து மாணவர்களுக்கும் இலவச, உயர்தர கல்வி வளங்களை வழங்குவதற்கு அர்ப்பணிக்கப்பட்ட சமூக-உந்துதல் தளமாகும்.',
        benefits: [
            {
                icon: FileText,
                title: 'இலவச வளங்கள்',
                description: 'கடந்த கால வினாத்தாள்கள், குறிப்புகள், பாடத்திட்டங்கள் மற்றும் படிப்பு பொருட்களை முற்றிலும் இலவசமாக அணுகுங்கள்.'
            },
            {
                icon: Users,
                title: 'சமூக உந்துதல்',
                description: 'அறிவைப் பகிர்வதில் நம்பிக்கை கொண்ட மாணவர்கள் மற்றும் ஆசிரியர்களால் கட்டமைக்கப்பட்டது.'
            },
            {
                icon: Heart,
                title: 'சம வாய்ப்பு',
                description: 'தரமான கல்வி வளங்கள் அனைவருக்கும் அணுகக்கூடியதாக இருக்க வேண்டும்.'
            }
        ],
        contribute: 'பகிர வளங்கள் உள்ளதா? உங்கள் பங்களிப்பு ஆயிரக்கணக்கான மாணவர்கள் வெற்றி பெற உதவும்!',
        getStarted: 'தொடங்கு',
        dontShowAgain: 'இதை மீண்டும் காட்டாதே'
    }
};

const languageLabels: Record<Language, string> = {
    en: 'English',
    si: 'සිංහල',
    ta: 'தமிழ்'
};

export function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language>('en');
    const [dontShowAgain, setDontShowAgain] = useState(false);

    // Check localStorage on mount
    useEffect(() => {
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (!dismissed) {
            // Small delay to let the page render first
            const timer = setTimeout(() => setIsOpen(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem(STORAGE_KEY, 'true');
        }
        setIsOpen(false);
    };

    const t = translations[language];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-primary/20">
                {/* Header with gradient */}
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 pb-6">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

                    {/* Language Toggle */}
                    <div className="flex justify-end mb-4">
                        <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full p-1">
                            <Globe className="w-4 h-4 text-muted-foreground ml-2" />
                            {(['en', 'si', 'ta'] as Language[]).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={cn(
                                        "px-3 py-1 text-xs font-medium rounded-full transition-all",
                                        language === lang
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {languageLabels[lang]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="relative text-center">
                        <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {t.welcome}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-gradient mb-2">
                            {t.title}
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {t.subtitle}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 pt-6 space-y-6">
                    <p className="text-center text-muted-foreground leading-relaxed">
                        {t.description}
                    </p>

                    {/* Benefits Grid */}
                    <div className="grid gap-4">
                        {t.benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <benefit.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contribute CTA */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center">
                        <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-sm">{t.contribute}</p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <Button
                            size="lg"
                            className="w-full text-lg"
                            onClick={handleClose}
                        >
                            {t.getStarted}
                        </Button>

                        <label className="flex items-center justify-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <input
                                type="checkbox"
                                checked={dontShowAgain}
                                onChange={(e) => setDontShowAgain(e.target.checked)}
                                className="rounded border-border"
                            />
                            {t.dontShowAgain}
                        </label>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
