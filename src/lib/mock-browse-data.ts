// Mock data for library browse API based on actual API response structure
// This is used as a fallback when the live API is unavailable

export interface BrowseFolder {
  id: string;
  name: string;
  slug: string;
}

export interface FacetItem {
  name: string;
  count: number;
}

export interface DocumentTag {
  id: string;
  name: string;
  slug: string;
  group: string;
  source: "SYSTEM" | "USER";
  parentId?: string | null;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  driveFileId: string;
  mimeType: string;
  views: number;
  downloads: number;
  tags: DocumentTag[];
  fileSize?: string | null;
  status?: string;
  source?: string;
}

export interface BrowseResponse {
  currentLevel: string;
  folders: Record<string, BrowseFolder[]>;
  facets: Record<string, FacetItem[]>;
  resources: Resource[];
}

// Base folders data
const LEVELS: BrowseFolder[] = [
  { id: "b355b6a5-e17c-42af-bc5e-56acd3c7bb26", name: "A/L", slug: "a-l" },
  { id: "25c3377e-c705-44c3-a186-a07681b5fc44", name: "O/L", slug: "o-l" },
  {
    id: "604e8a0a-dc88-4638-ab3f-b64fb9e03499",
    name: "Primary",
    slug: "primary",
  },
  {
    id: "03b0f510-ccdf-428e-8ab4-de0d6c86623a",
    name: "Scholarship",
    slug: "scholarship",
  },
  {
    id: "5a3afece-a3c6-4a8e-81f9-f28c2455af63",
    name: "Secondary",
    slug: "secondary",
  },
];

const AL_GRADES: BrowseFolder[] = [
  {
    id: "341f1a30-93dd-4b7e-8a01-c2e28d143a46",
    name: "Grade 12",
    slug: "grade-12",
  },
  {
    id: "8e3c8ce2-3720-4717-bfab-97da4c9f50a1",
    name: "Grade 13",
    slug: "grade-13",
  },
];

const OL_GRADES: BrowseFolder[] = [
  { id: "ol-grade-10", name: "Grade 10", slug: "grade-10" },
  { id: "ol-grade-11", name: "Grade 11", slug: "grade-11" },
];

const STREAMS: BrowseFolder[] = [
  {
    id: "99bad371-ad02-4c1c-b671-c6cbdbfb432c",
    name: "Science Stream",
    slug: "science-stream",
  },
  {
    id: "cebdd106-c06b-4598-9f81-22763edad5bf",
    name: "Arts Stream",
    slug: "arts-stream",
  },
  {
    id: "3f3ee867-724d-49c9-a07a-547d4ea7269f",
    name: "Commerce Stream",
    slug: "commerce-stream",
  },
  { id: "tech-stream", name: "Technology Stream", slug: "technology-stream" },
  { id: "common-stream", name: "Common Stream", slug: "common-stream" },
];

const SCIENCE_SUBJECTS: BrowseFolder[] = [
  { id: "physics-id", name: "Physics", slug: "physics" },
  { id: "chemistry-id", name: "Chemistry", slug: "chemistry" },
  { id: "biology-id", name: "Biology", slug: "biology" },
  { id: "combined-maths-id", name: "Combined Maths", slug: "combined-maths" },
];

const ARTS_SUBJECTS: BrowseFolder[] = [
  { id: "history-id", name: "History", slug: "history" },
  { id: "geography-id", name: "Geography", slug: "geography" },
  { id: "economics-art-id", name: "Economics", slug: "economics" },
  {
    id: "political-science-id",
    name: "Political Science",
    slug: "political-science",
  },
  { id: "sinhala-id", name: "Sinhala", slug: "sinhala" },
];

const COMMERCE_SUBJECTS: BrowseFolder[] = [
  { id: "economics-id", name: "Economics", slug: "economics" },
  { id: "accounting-id", name: "Accounting", slug: "accounting" },
  {
    id: "business-studies-id",
    name: "Business Studies",
    slug: "business-studies",
  },
];

const MEDIUMS: BrowseFolder[] = [
  {
    id: "c117ffd9-a7bb-492f-8353-adad5ec152f0",
    name: "English Medium",
    slug: "english-medium",
  },
  { id: "sinhala-medium-id", name: "Sinhala Medium", slug: "sinhala-medium" },
  { id: "tamil-medium-id", name: "Tamil Medium", slug: "tamil-medium" },
];

const RESOURCE_TYPES: BrowseFolder[] = [
  {
    id: "57be57b2-067b-4474-90ca-8041b9aa9f5a",
    name: "Syllabus",
    slug: "syllabus",
  },
  {
    id: "be10ff8f-342e-46fe-9e9a-826a3a4b062f",
    name: "Teacher's Guide",
    slug: "teacher-s-guide",
  },
  {
    id: "8c7c783b-0b36-4bc5-b3ff-38ec181b279a",
    name: "Teacher Guide",
    slug: "teacher-guide",
  },
  { id: "notes-id", name: "Notes", slug: "notes" },
  { id: "past-paper-id", name: "Past Paper", slug: "past-paper" },
  { id: "textbook-id", name: "Textbook", slug: "textbook" },
];

// Sample resources
const SAMPLE_RESOURCES: Resource[] = [
  {
    id: "9a1661f3-fef5-484f-9219-07752647eb11",
    title: "General English A/L.pdf",
    description: "A/L English study material",
    driveFileId: "1SEr7hH-oD4DGcO-mvdMT2Rr-8d_vBuoK",
    mimeType: "application/pdf",
    views: 156,
    downloads: 42,
    status: "APPROVED",
    source: "SYSTEM",
    tags: [
      {
        id: "b355b6a5-e17c-42af-bc5e-56acd3c7bb26",
        name: "A/L",
        slug: "a-l",
        group: "LEVEL",
        source: "SYSTEM",
      },
    ],
  },
  {
    id: "ee2a11ab-8a7c-41fd-b183-035be0d918e7",
    title: "GIT Grade 12 & 13.pdf",
    description: "Information Technology syllabus",
    driveFileId: "1BpX0LAWP2rGUmn_HZD3mUwTKciQlqZI2",
    mimeType: "application/pdf",
    views: 234,
    downloads: 89,
    status: "APPROVED",
    source: "SYSTEM",
    tags: [
      {
        id: "b355b6a5-e17c-42af-bc5e-56acd3c7bb26",
        name: "A/L",
        slug: "a-l",
        group: "LEVEL",
        source: "SYSTEM",
      },
      {
        id: "ict-tag",
        name: "Information and Communication Technology",
        slug: "ict",
        group: "SUBJECT",
        source: "SYSTEM",
      },
    ],
  },
  {
    id: "033eb3c0-18b0-4c83-9744-d702d378e289",
    title: "Grade 13 ICT Syllabus.pdf",
    description: "Complete ICT syllabus for Grade 13 A/L students",
    driveFileId: "1GkV9HUSsSI7u9Y0al7Z5tlQoi4GY_r66",
    mimeType: "application/pdf",
    views: 412,
    downloads: 156,
    status: "APPROVED",
    source: "SYSTEM",
    tags: [
      {
        id: "b355b6a5-e17c-42af-bc5e-56acd3c7bb26",
        name: "A/L",
        slug: "a-l",
        group: "LEVEL",
        source: "SYSTEM",
      },
      {
        id: "8e3c8ce2-3720-4717-bfab-97da4c9f50a1",
        name: "Grade 13",
        slug: "grade-13",
        group: "GRADE",
        source: "SYSTEM",
      },
      {
        id: "57be57b2-067b-4474-90ca-8041b9aa9f5a",
        name: "Syllabus",
        slug: "syllabus",
        group: "RESOURCE_TYPE",
        source: "SYSTEM",
      },
      {
        id: "c117ffd9-a7bb-492f-8353-adad5ec152f0",
        name: "English Medium",
        slug: "english-medium",
        group: "MEDIUM",
        source: "SYSTEM",
      },
    ],
  },
  {
    id: "0aa0938f-976c-4a8b-8834-83e8b32adc61",
    title: "Grade 12 Combined Mathematics Teacher Guide.pdf",
    description: "Teacher guide for Combined Maths",
    driveFileId: "14qelUr01ExGMryNlVOwB-9fud3ZL0p0H",
    mimeType: "application/pdf",
    views: 189,
    downloads: 67,
    status: "APPROVED",
    source: "SYSTEM",
    tags: [
      {
        id: "b355b6a5-e17c-42af-bc5e-56acd3c7bb26",
        name: "A/L",
        slug: "a-l",
        group: "LEVEL",
        source: "SYSTEM",
      },
      {
        id: "341f1a30-93dd-4b7e-8a01-c2e28d143a46",
        name: "Grade 12",
        slug: "grade-12",
        group: "GRADE",
        source: "SYSTEM",
      },
      {
        id: "99bad371-ad02-4c1c-b671-c6cbdbfb432c",
        name: "Science Stream",
        slug: "science-stream",
        group: "STREAM",
        source: "SYSTEM",
      },
      {
        id: "combined-maths-tag",
        name: "Combined Maths",
        slug: "combined-maths",
        group: "SUBJECT",
        source: "SYSTEM",
      },
      {
        id: "be10ff8f-342e-46fe-9e9a-826a3a4b062f",
        name: "Teacher's Guide",
        slug: "teacher-s-guide",
        group: "RESOURCE_TYPE",
        source: "SYSTEM",
      },
      {
        id: "c117ffd9-a7bb-492f-8353-adad5ec152f0",
        name: "English Medium",
        slug: "english-medium",
        group: "MEDIUM",
        source: "SYSTEM",
      },
    ],
  },
  {
    id: "13cbef52-eb2e-4465-8171-0122a6f51065",
    title: "Grade 13 Economics Teacher Guide (English).pdf",
    description: "Economics teacher guide for A/L",
    driveFileId: "1_g01CmhSp09SCzeFhHROgGiZe1fastZO",
    mimeType: "application/pdf",
    views: 145,
    downloads: 52,
    status: "APPROVED",
    source: "SYSTEM",
    tags: [
      {
        id: "b355b6a5-e17c-42af-bc5e-56acd3c7bb26",
        name: "A/L",
        slug: "a-l",
        group: "LEVEL",
        source: "SYSTEM",
      },
      {
        id: "8e3c8ce2-3720-4717-bfab-97da4c9f50a1",
        name: "Grade 13",
        slug: "grade-13",
        group: "GRADE",
        source: "SYSTEM",
      },
      {
        id: "cebdd106-c06b-4598-9f81-22763edad5bf",
        name: "Arts Stream",
        slug: "arts-stream",
        group: "STREAM",
        source: "SYSTEM",
      },
      {
        id: "economics-tag",
        name: "Economics",
        slug: "economics",
        group: "SUBJECT",
        source: "SYSTEM",
      },
      {
        id: "8c7c783b-0b36-4bc5-b3ff-38ec181b279a",
        name: "Teacher Guide",
        slug: "teacher-guide",
        group: "RESOURCE_TYPE",
        source: "SYSTEM",
      },
      {
        id: "c117ffd9-a7bb-492f-8353-adad5ec152f0",
        name: "English Medium",
        slug: "english-medium",
        group: "MEDIUM",
        source: "SYSTEM",
      },
    ],
  },
  {
    id: "1408ec76-e68f-4781-9095-443d48ff0cd0",
    title: "Grade 13 Logic and Scientific Method Syllabus.pdf",
    description: "Syllabus for Logic and Scientific Method",
    driveFileId: "19qfm-CyegjwTtfQJ4S4Z818JjHzeECCD",
    mimeType: "application/pdf",
    views: 98,
    downloads: 34,
    status: "APPROVED",
    source: "SYSTEM",
    tags: [
      {
        id: "b355b6a5-e17c-42af-bc5e-56acd3c7bb26",
        name: "A/L",
        slug: "a-l",
        group: "LEVEL",
        source: "SYSTEM",
      },
      {
        id: "8e3c8ce2-3720-4717-bfab-97da4c9f50a1",
        name: "Grade 13",
        slug: "grade-13",
        group: "GRADE",
        source: "SYSTEM",
      },
      {
        id: "cebdd106-c06b-4598-9f81-22763edad5bf",
        name: "Arts Stream",
        slug: "arts-stream",
        group: "STREAM",
        source: "SYSTEM",
      },
      {
        id: "57be57b2-067b-4474-90ca-8041b9aa9f5a",
        name: "Syllabus",
        slug: "syllabus",
        group: "RESOURCE_TYPE",
        source: "SYSTEM",
      },
      {
        id: "c117ffd9-a7bb-492f-8353-adad5ec152f0",
        name: "English Medium",
        slug: "english-medium",
        group: "MEDIUM",
        source: "SYSTEM",
      },
    ],
  },
];

interface Filters {
  level?: string;
  stream?: string;
  subject?: string;
  grade?: string;
  medium?: string;
  resourceType?: string;
  lesson?: string;
}

// Get mock browse data based on filters
export function getMockBrowseData(filters: Filters): BrowseResponse {
  const { level, stream, subject, grade, medium, resourceType } = filters;

  // Filter resources based on provided filters
  let filteredResources = [...SAMPLE_RESOURCES];

  if (level) {
    filteredResources = filteredResources.filter((r) =>
      r.tags.some((t) => t.group === "LEVEL" && t.name === level)
    );
  }
  if (stream) {
    filteredResources = filteredResources.filter((r) =>
      r.tags.some((t) => t.group === "STREAM" && t.name === stream)
    );
  }
  if (subject) {
    filteredResources = filteredResources.filter((r) =>
      r.tags.some((t) => t.group === "SUBJECT" && t.name === subject)
    );
  }
  if (grade) {
    filteredResources = filteredResources.filter((r) =>
      r.tags.some((t) => t.group === "GRADE" && t.name === grade)
    );
  }
  if (medium) {
    filteredResources = filteredResources.filter((r) =>
      r.tags.some((t) => t.group === "MEDIUM" && t.name === medium)
    );
  }
  if (resourceType) {
    filteredResources = filteredResources.filter((r) =>
      r.tags.some((t) => t.group === "RESOURCE_TYPE" && t.name === resourceType)
    );
  }

  // Determine which folders to show based on current filters
  const folders: Record<string, BrowseFolder[]> = {};

  if (!level) {
    // No level selected - show levels
    folders["LEVEL"] = LEVELS;
  } else if (level === "A/L") {
    // A/L selected - show grades and streams
    if (!grade) {
      folders["GRADE"] = AL_GRADES;
    }
    if (!stream) {
      folders["STREAM"] = STREAMS;
    }
    if (stream && !subject) {
      // Show subjects based on stream
      if (stream === "Science Stream") {
        folders["SUBJECT"] = SCIENCE_SUBJECTS;
      } else if (stream === "Arts Stream") {
        folders["SUBJECT"] = ARTS_SUBJECTS;
      } else if (stream === "Commerce Stream") {
        folders["SUBJECT"] = COMMERCE_SUBJECTS;
      }
    }
    if (subject && !medium) {
      folders["MEDIUM"] = MEDIUMS;
    }
    if (medium && !resourceType) {
      folders["RESOURCE_TYPE"] = RESOURCE_TYPES;
    }
  } else if (level === "O/L") {
    if (!grade) {
      folders["GRADE"] = OL_GRADES;
    }
    if (grade && !medium) {
      folders["MEDIUM"] = MEDIUMS;
    }
  } else {
    // Other levels
    if (!medium) {
      folders["MEDIUM"] = MEDIUMS;
    }
  }

  // Build facets from filtered resources
  const facets: Record<string, FacetItem[]> = {};

  if (filteredResources.length > 0) {
    // Count resource types
    const resourceTypeCounts: Record<string, number> = {};
    const mediumCounts: Record<string, number> = {};

    filteredResources.forEach((r) => {
      r.tags.forEach((t) => {
        if (t.group === "RESOURCE_TYPE") {
          resourceTypeCounts[t.name] = (resourceTypeCounts[t.name] || 0) + 1;
        }
        if (t.group === "MEDIUM") {
          mediumCounts[t.name] = (mediumCounts[t.name] || 0) + 1;
        }
      });
    });

    if (Object.keys(resourceTypeCounts).length > 0 && !resourceType) {
      facets["RESOURCE_TYPE"] = Object.entries(resourceTypeCounts).map(
        ([name, count]) => ({ name, count })
      );
    }
    if (Object.keys(mediumCounts).length > 0 && !medium) {
      facets["MEDIUM"] = Object.entries(mediumCounts).map(([name, count]) => ({
        name,
        count,
      }));
    }
  }

  return {
    currentLevel: level || "Library",
    folders,
    facets,
    resources: filteredResources,
  };
}
