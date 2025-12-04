export type Pdf = {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  language: "Sinhala" | "Tamil" | "English";
  tags: string[];
  uploader: {
    name: string;
    avatarId: string;
  };
  uploadedAt: string;
  downloads: number;
  status: "Published" | "Pending" | "Rejected";
};

export const pdfs: Pdf[] = [
  {
    id: "1",
    title: "Combined Maths - Paper 1",
    description: "A comprehensive past paper for A/L Combined Mathematics.",
    subject: "Combined Maths",
    level: "A/L",
    language: "Sinhala",
    tags: ["past paper", "2022", "a/l"],
    uploader: { name: "Kasun Perera", avatarId: "user-avatar-1" },
    uploadedAt: "2023-10-26",
    downloads: 1250,
    status: "Published",
  },
  {
    id: "2",
    title: "Physics - Mechanics Notes",
    description:
      "Detailed notes on classical mechanics for university students.",
    subject: "Physics",
    level: "University",
    language: "English",
    tags: ["notes", "mechanics", "undergraduate"],
    uploader: { name: "Fathima Rizwan", avatarId: "user-avatar-2" },
    uploadedAt: "2023-10-25",
    downloads: 890,
    status: "Published",
  },
  {
    id: "3",
    title: "Grade 10 - Science Term Test",
    description: "Mid-term test paper for grade 10 science curriculum.",
    subject: "Science",
    level: "Grade 10",
    language: "Tamil",
    tags: ["term test", "grade 10"],
    uploader: { name: "Anura Kumara", avatarId: "user-avatar-3" },
    uploadedAt: "2023-10-24",
    downloads: 760,
    status: "Published",
  },
  {
    id: "4",
    title: "Chemistry - Organic Chemistry Basics",
    description:
      "Introduction to organic chemistry, covering nomenclature and basic reactions.",
    subject: "Chemistry",
    level: "A/L",
    language: "English",
    tags: ["organic", "notes", "a/l"],
    uploader: { name: "Nimali Silva", avatarId: "user-avatar-4" },
    uploadedAt: "2023-10-22",
    downloads: 1500,
    status: "Published",
  },
  {
    id: "5",
    title: "Introduction to Programming in Python",
    description:
      "Beginner-friendly guide to Python programming concepts with examples.",
    subject: "IT",
    level: "University",
    language: "English",
    tags: ["python", "programming", "beginner"],
    uploader: { name: "Fathima Rizwan", avatarId: "user-avatar-2" },
    uploadedAt: "2023-10-20",
    downloads: 2100,
    status: "Pending",
  },
  {
    id: "6",
    title: "Sinhala Language Grammar Guide",
    description: "Comprehensive guide on Sinhala grammar for O/L students.",
    subject: "Sinhala",
    level: "O/L",
    language: "Sinhala",
    tags: ["grammar", "o/l", "notes"],
    uploader: { name: "Kasun Perera", avatarId: "user-avatar-1" },
    uploadedAt: "2023-10-19",
    downloads: 650,
    status: "Rejected",
  },
  {
    id: "7",
    title: "History of Sri Lanka",
    description:
      "A detailed account of Sri Lankan history from ancient times to the modern era.",
    subject: "History",
    level: "Grade 11",
    language: "Sinhala",
    tags: ["history", "sri lanka", "notes"],
    uploader: { name: "Anura Kumara", avatarId: "user-avatar-3" },
    uploadedAt: "2023-10-18",
    downloads: 450,
    status: "Published",
  },
  {
    id: "8",
    title: "Business Statistics - Course Material",
    description:
      "University-level course material for Business Statistics, including formulas and examples.",
    subject: "Business Studies",
    level: "University",
    language: "English",
    tags: ["statistics", "business", "university"],
    uploader: { name: "Nimali Silva", avatarId: "user-avatar-4" },
    uploadedAt: "2023-10-15",
    downloads: 1100,
    status: "Published",
  },
];

export const subjects = [
  { name: "Combined Maths" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Biology" },
  { name: "Science" },
  { name: "Commerce" },
  { name: "IT" },
  { name: "English" },
  { name: "Sinhala" },
  { name: "History" },
  { name: "Business Studies" },
  { name: "Economics" },
];

export const levels = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "O/L",
  "A/L",
  "University",
  "Other",
];

export type Contributor = {
  id: string;
  name: string;
  avatarId: string;
  contribution: string;
};

export const contributors: Contributor[] = [
  {
    id: "1",
    name: "Kasun Perera",
    avatarId: "user-avatar-1",
    contribution: "Top Maths Contributor",
  },
  {
    id: "2",
    name: "Fathima Rizwan",
    avatarId: "user-avatar-2",
    contribution: "Science & Tech Whiz",
  },
  {
    id: "3",
    name: "Anura Kumara",
    avatarId: "user-avatar-3",
    contribution: "Humanities Expert",
  },
  {
    id: "4",
    name: "Nimali Silva",
    avatarId: "user-avatar-4",
    contribution: "A/L & University Specialist",
  },
  {
    id: "5",
    name: "Saman Kumara",
    avatarId: "user-avatar-1",
    contribution: "New Contributor",
  },
  {
    id: "6",
    name: "Rani Silva",
    avatarId: "user-avatar-2",
    contribution: "O/L Notes Provider",
  },
];
