interface OrganizationSchema {
    type: 'Organization';
    name: string;
    url: string;
    logo: string;
    description: string;
    sameAs?: string[];
}

interface WebSiteSchema {
    type: 'WebSite';
    name: string;
    url: string;
    description: string;
    potentialAction?: {
        type: 'SearchAction';
        target: string;
        queryInput: string;
    };
}

interface EducationalResourceSchema {
    type: 'EducationalResource';
    name: string;
    description: string;
    url: string;
    provider: {
        type: 'Organization';
        name: string;
    };
    educationalLevel?: string;
    learningResourceType?: string;
    inLanguage?: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

type SchemaType = OrganizationSchema | WebSiteSchema | EducationalResourceSchema;

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apearchive.lk';

export function generateOrganizationSchema(): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'APE ARCHIVE',
        url: siteUrl,
        logo: `${siteUrl}/logo/logo-dark.svg`,
        description: 'Free A/L study materials for Sri Lankan students',
        sameAs: [
            'https://github.com/APE-ARCHIVE',
            'https://twitter.com/apearchive',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            availableLanguage: ['English', 'Sinhala', 'Tamil'],
        },
    };
}

export function generateWebSiteSchema(): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'APE ARCHIVE',
        url: siteUrl,
        description: 'Access free A/L study materials, past papers, notes, and educational resources for Sri Lankan students.',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en', 'si', 'ta'],
    };
}

export function generateEducationalResourceSchema(resource: {
    title: string;
    description: string;
    id: string;
    subject?: string;
    grade?: string;
    resourceType?: string;
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'DigitalDocument',
        name: resource.title,
        description: resource.description,
        url: `${siteUrl}/pdfs/${resource.id}`,
        provider: {
            '@type': 'Organization',
            name: 'APE ARCHIVE',
        },
        educationalLevel: resource.grade || 'Advanced Level',
        learningResourceType: resource.resourceType || 'Study Material',
        about: resource.subject,
        inLanguage: 'en',
        isAccessibleForFree: true,
        fileFormat: 'application/pdf',
    };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateCollectionPageSchema(params: {
    name: string;
    description: string;
    url: string;
    itemCount?: number;
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: params.name,
        description: params.description,
        url: params.url,
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: params.itemCount || 0,
        },
        provider: {
            '@type': 'Organization',
            name: 'APE ARCHIVE',
        },
    };
}

// Component to inject JSON-LD into page
export function JsonLd({ data }: { data: object | object[] }) {
    const jsonLd = Array.isArray(data) ? data : [data];

    return (
        <>
            {jsonLd.map((item, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </>
    );
}
