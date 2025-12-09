import { Metadata } from 'next';
import { GraduationCap, Heart, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about APE ARCHIVE - our mission to provide free A/L study materials for Sri Lankan students, our vision, values, and the story behind our platform.',
  openGraph: {
    title: 'About APE ARCHIVE',
    description: 'Learn about our mission to provide free A/L study materials for Sri Lankan students.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline sm:text-5xl">About APE ARCHIVE</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our mission is to create a collaborative and accessible educational environment for all Sri Lankan students, especially during times of crisis.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col items-center gap-y-4 rounded-xl border bg-card p-8 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold leading-7 tracking-tight text-foreground">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide a centralized, free-to-use platform for sharing and accessing educational materials, breaking down barriers to learning.
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-4 rounded-xl border bg-card p-8 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold leading-7 tracking-tight text-foreground">Our Vision</h3>
            <p className="text-muted-foreground">
              We envision a future where every student in Sri Lanka has the resources they need to succeed, regardless of their circumstances.
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-4 rounded-xl border bg-card p-8 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold leading-7 tracking-tight text-foreground">Our Values</h3>
            <p className="text-muted-foreground">
              Collaboration, Accessibility, and Community. We believe in the power of sharing knowledge to uplift everyone.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">The Story Behind APE ARCHIVE</h2>
          <p className="mt-6 text-muted-foreground">
            APE ARCHIVE was born out of the challenges faced by students during national emergencies and lockdowns. Access to physical libraries and study groups became impossible, leaving many without the materials they needed. We created this platform to ensure that learning never stops, providing a digital library built by the community, for the community.
          </p>
        </div>
      </div>
    </div>
  )
}
