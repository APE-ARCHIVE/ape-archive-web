'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UploadCloud, Loader2, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

// Tag interface
interface Tag {
  id: string;
  name: string;
  group: string;
}

interface GroupedTags {
  [group: string]: Tag[];
}

// Form schema matching API requirements
const uploadFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  grade: z.string({ required_error: 'Please select a grade.' }),
  subject: z.string({ required_error: 'Please select a subject.' }),
  lesson: z.string({ required_error: 'Please enter the lesson/topic.' }).min(1, 'Lesson is required'),
  medium: z.string({ required_error: 'Please select a medium.' }),
  file: z.any().refine((files) => files?.length === 1, 'File is required.'),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export function UploadForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groupedTags, setGroupedTags] = useState<GroupedTags>({});
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: '',
      description: '',
      lesson: '',
    },
    mode: 'onChange',
  });

  const fileRef = form.register('file');

  // Fetch tags from API
  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await apiClient.get('/api/v1/library/tags');
        console.log('Tags API response:', response.data);

        if (response.data?.success && response.data?.data) {
          const data = response.data.data;

          // Check if data is already grouped (object) or an array
          if (Array.isArray(data)) {
            // Data is an array of tags - group by group property
            const grouped = data.reduce((acc: GroupedTags, tag: Tag) => {
              if (!acc[tag.group]) {
                acc[tag.group] = [];
              }
              acc[tag.group].push(tag);
              return acc;
            }, {});
            setGroupedTags(grouped);
          } else if (typeof data === 'object') {
            // Data is already grouped - use as-is
            setGroupedTags(data as GroupedTags);
          }
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error);
        toast({
          title: 'Error',
          description: 'Failed to load form options. Please refresh the page.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingTags(false);
      }
    }

    fetchTags();
  }, [toast]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileName(files[0].name);
    } else {
      setSelectedFileName(null);
    }
  };

  // Clear selected file
  const clearFile = () => {
    form.setValue('file', undefined);
    setSelectedFileName(null);
    // Reset the file input
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  async function onSubmit(data: UploadFormValues) {
    setIsSubmitting(true);

    try {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('grade', data.grade);
      formData.append('subject', data.subject);
      formData.append('lesson', data.lesson);
      formData.append('medium', data.medium);
      if (data.title) formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);

      // Get the token from cookies to ensure it's passed
      const Cookies = (await import('js-cookie')).default;
      const token = Cookies.get('accessToken');

      if (!token) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to upload resources.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      const response = await apiClient.post('/api/v1/resources/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        toast({
          title: 'Success!',
          description: 'Your resource has been uploaded and is pending review.',
        });
        // Reset form
        form.reset();
        setSelectedFileName(null);
      } else {
        throw new Error(response.data?.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Get tags for specific groups
  const grades = groupedTags['Grade'] || [];
  const subjects = groupedTags['Subject'] || [];
  const mediums = groupedTags['Medium'] || [];

  if (isLoadingTags) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title - Optional */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., A/L Chemistry Past Paper 2022" {...field} />
              </FormControl>
              <FormDescription>
                If left empty, the filename will be used.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description - Optional */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a brief description of the PDF content."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grade and Subject */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {grades.map((tag) => (
                      <SelectItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects.map((tag) => (
                      <SelectItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Lesson and Medium */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="lesson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson / Topic *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Unit 1, Chapter 3, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medium *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mediums.map((tag) => (
                      <SelectItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* File Upload */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF File *</FormLabel>
              <FormControl>
                <div className="flex justify-center w-full">
                  {selectedFileName ? (
                    <div className="flex items-center justify-between w-full p-4 border-2 border-border rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium truncate max-w-[300px]">
                          {selectedFileName}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF only (MAX. 50MB)</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        {...fileRef}
                        onChange={(e) => {
                          fileRef.onChange(e);
                          handleFileChange(e);
                        }}
                      />
                    </label>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            'Submit for Review'
          )}
        </Button>
      </form>
    </Form>
  );
}
