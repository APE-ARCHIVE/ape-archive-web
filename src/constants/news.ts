export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "Exam" | "General" | "University" | "Scholarship";
  source: string;
  imageUrl?: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "2024 A/L Exam Timetable Released",
    summary:
      "The Department of Examinations has officially released the timetable for the 2024 G.C.E. Advanced Level examinations. Students can now download the schedule from the official website.",
    date: "2024-01-15",
    category: "Exam",
    source: "Department of Examinations",
  },
  {
    id: "2",
    title: "New Scholarship Scheme for University Students",
    summary:
      "The Ministry of Education has announced a new scholarship program named 'Sisu Saviya' to support undergraduates facing financial difficulties. Applications are open until the end of this month.",
    date: "2024-01-12",
    category: "Scholarship",
    source: "Ministry of Education",
  },
  {
    id: "3",
    title: "University Entrance Cut-off Marks Published",
    summary:
      "The University Grants Commission (UGC) has released the Z-score cut-off marks for university admission for the academic year 2023/2024.",
    date: "2024-01-10",
    category: "University",
    source: "UGC",
  },
  {
    id: "4",
    title: "Digital Education Platform Launched for Rural Schools",
    summary:
      "A new digital learning initiative aims to provide smart classrooms and internet access to 500 rural schools across the country, bridging the digital divide.",
    date: "2024-01-08",
    category: "General",
    source: "Education Times",
  },
  {
    id: "5",
    title: "O/L Re-correction Results Out Now",
    summary:
      "The re-correction results for the 2023 G.C.E. Ordinary Level examination have been released. Candidates can check their results online.",
    date: "2024-01-05",
    category: "Exam",
    source: "Department of Examinations",
  },
];
