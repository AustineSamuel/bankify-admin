  export const mockVerificationInfo = {
    profilePicture: "https://example.com/profile_picture.jpg",
    basicInformation: {
      fullName: "John Doe",
      username: "john_doe123",
      email: "john.doe@example.com",
    },
    verificationStatus: "Verified",
    timestamp: "2023-01-15T10:30:00Z",
    additionalInformation: "This verification was conducted for account registration purpose",
}
export const mockUser = {
    username: "john_doe123",
    password: "StrongPassword123!",
    email: "john.doe@example.com",
    personalInformation: {
      fullName: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      address: "123 Main Street, Cityville, State, Country",
      contactNumber: "+1 (555) 123-4567"
    },
    biometricData: {
      facialFeatures: "Facial recognition data",
      fingerprints: "Fingerprint data"
    },
    permissions: ["user", "verified"],
    ...mockVerificationInfo
  };
  



  export const appointment = {
    id: "123456",
    userId: "7890",
    embassyId: "5678",
    type: "Visa Application",
    dateTime: "2024-02-15T09:00:00",
    status: "Scheduled",
    notes: "Please arrive 15 minutes before your appointment.",
    confirmationCode: "ABC123",
    reminderSettings: {
      email: true,
      sms: false
    },
    attendees: ["Alice", "Bob"],
    requiredDocuments: ["Passport", "Proof of Address"],
    createdAt: "2024-01-15T12:30:00",
    updatedAt: "2024-01-20T14:45:00"
  }

  export const embassy = {
    id: "123456",
    name: "Embassy of Example",
    country: "Exampleland",
    city: "Example City",
    address: "123 Embassy Street, Example City, Exampleland",
    contactInformation: {
      phone: "+1234567890",
      email: "info@exampleembassy.com",
      website: "www.exampleembassy.com"
    },
    operatingHours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM"
    },
    servicesOffered: ["Visa Services", "Passport Issuance", "Consular Assistance"],
    appointmentBookingProcedure: "Appointments can be booked online through our website or by calling our office during business hours.",
    emergencyContactInformation: {
      phone: "+1234567890",
      email: "emergency@exampleembassy.com"
    },
    locationCoordinates: {
      latitude: 12.3456,
      longitude: -98.7654
    }
  };
  





