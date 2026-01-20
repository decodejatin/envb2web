/**
 * DATA CONFIGURATION
 * ------------------
 * This file contains the content structures for the application.
 */

const projectData = {
    // Gallery Data
    birds: [], // Expects: { id, name, scientificName, image, description, category }

    // Journal Entries
    journal: [], // Expects: { id, title, date, image, summary }

    // Academic Resources
    academic: [], // Expects: { id, title, type, author, link }

    // News Highlights
    news: [] // Expects: { id, headline, source, date, snippet }
};

const siteConfig = {
    institute: "NIT Jalandhar",
    batch: "B2",
    year: "2026",
    department: "CSE & DSE Batch",
    mentor: "Prof. Navin Chandar Kothiyal",
    contactEmail: "" // Placeholder
};

const teamMembers = [{
        name: "Jatin Jalandhra",
        role: "CR & Lead Developer",
        initials: "JJ"
    },
    {
        name: "Pragati",
        role: "Group Admin",
        initials: "P"
    },
    
    {
        name: "Aadarsh Singh",
        role: "Biodiversity Group Lead",
        initials: "AS"
    }
];
