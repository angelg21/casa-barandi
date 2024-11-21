

export interface VoluntariosFormValues {
    fullName: string;                    // Full name of the volunteer
    age: number;                         // Age of the volunteer
    gender: string;                      // Gender (male, female, other)
    email: string;                       // Email address
    phoneNumber: string;                 // Phone number
    address: string;                     // Address or city of residence
    experience: string;                  // Brief description of previous volunteer experience
    skills: string[];                    // List of relevant skills or knowledge
    areasOfInterest: string[];           // Areas of interest (e.g., education, health, logistics support)
    availability: {                      // Availability information
        days: string[];                  // Days available (e.g., Monday, Wednesday, Friday)
        hours: string;                   // Availability hours (e.g., "Morning", "Afternoon", "Full Day")
    };
    emergencyContact: {                  // Emergency contact information
        name: string;
        phoneNumber: string;
        relationship: string;            // Relationship to the volunteer (e.g., parent, friend)
    };
    additionalComments: string;          // Additional comments or motivation for volunteering
    acceptsTerms: boolean;               // Confirmation that the volunteer accepts terms and conditions
}
