'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { subjects, levels } from '@/constants/data';
import { Filter } from 'lucide-react';

const languages = ['Sinhala', 'Tamil', 'English'];

export function Filters() {
  return (
    <>
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters & Sort
            </Button>
          </SheetTrigger>
          <SheetContent>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block">
        <FilterContent />
      </div>
    </>
  );
}

function FilterContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Search</h3>
        <Input placeholder="Search by title or description..." />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Sort by</h3>
        <Select defaultValue="newest">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="az">A-Z</SelectItem>
            <SelectItem value="za">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="multiple" defaultValue={['subject', 'level']} className="w-full">
        <AccordionItem value="subject">
          <AccordionTrigger className="text-lg font-semibold">Subject</AccordionTrigger>
          <AccordionContent className="space-y-2 max-h-60 overflow-y-auto">
            {subjects.map((subject) => (
              <div key={subject.name} className="flex items-center space-x-2">
                <Checkbox id={`subject-${subject.name}`} />
                <Label htmlFor={`subject-${subject.name}`} className="font-normal">
                  {subject.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="level">
          <AccordionTrigger className="text-lg font-semibold">Level</AccordionTrigger>
          <AccordionContent className="space-y-2 max-h-60 overflow-y-auto">
            {levels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox id={`level-${level}`} />
                <Label htmlFor={`level-${level}`} className="font-normal">
                  {level}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="language">
          <AccordionTrigger className="text-lg font-semibold">Language</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox id={`language-${language}`} />
                <Label htmlFor={`language-${language}`} className="font-normal">
                  {language}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button className="w-full">Apply Filters</Button>
      <Button variant="outline" className="w-full">Reset</Button>
    </div>
  );
}
