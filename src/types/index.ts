export type UserRole = 'student' | 'parent' | 'teacher' | 'institute' | 'vendor' | 'admin';

export interface Product {
  id: string;
  name: string;
  category: 'Books & Curriculum' | 'Smart Electronics' | 'Uniforms & Apparel' | 'Stationery & Art' | 'Campus Furniture' | 'Lab & Science Equipment';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  vendorName: string;
  vendorVerified: boolean;
  image: string;
  description: string;
  bulkDiscountTier?: string;
  isBulkEligible: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface JobPosting {
  id: string;
  title: string;
  type: 'Teaching' | 'Non-Teaching';
  instituteName: string;
  instituteLocation: string;
  subjectOrDept: string;
  experienceRequired: string;
  salaryRange: string;
  employmentType: 'Full-time' | 'Contract' | 'Part-time';
  postedDate: string;
  deadline: string;
  description: string;
  qualifications: string[];
  applicantsCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  instituteName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  experienceYears: number;
  resumeFileName: string;
  status: 'Applied' | 'Shortlisted' | 'Interview Scheduled' | 'Rejected';
  appliedDate: string;
  interviewDetails?: {
    date: string;
    time: string;
    venue: string;
    coordinator: string;
    contactNumber: string;
    mode: 'Offline Campus Visit';
  };
}

export interface AdmissionNotification {
  id: string;
  instituteName: string;
  instituteLogo: string;
  location: string;
  courses: string[];
  academicYear: string;
  status: 'Admissions Open' | 'Pre-Admission Open' | 'Closing Soon';
  openingDate: string;
  closingDate: string;
  intakeCapacity: number;
  eligibilityCutoff: number; // e.g. 85%
  isPreAdmissionAvailable: boolean;
  applicationType: 'internal' | 'external';
  externalUrl?: string;
  annualFee: string;
  accreditation: string;
}

export interface AdmissionApplication {
  id: string;
  admissionId: string;
  instituteName: string;
  courseSelected: string;
  studentName: string;
  parentName: string;
  percentageMarks: number;
  appliedDate: string;
  isPreAdmission: boolean;
  autoSubmitDate?: string;
  status: 'Pending' | 'Auto-Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  rejectionReason?: string;
}

export interface VideoContent {
  id: string;
  title: string;
  creatorName: string;
  creatorRole: string;
  creatorAvatar: string;
  instituteAffiliation?: string;
  category: string;
  thumbnail: string;
  views: number;
  likes: number;
  duration: string;
  publishedTime: string;
  description: string;
  tags: string[];
  shisyaCount: number;
  isFollowedByCurrentUser?: boolean;
}

export interface SocialPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  institute?: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  shares: number;
  timestamp: string;
  hasLiked?: boolean;
  comments: {
    id: string;
    author: string;
    avatar: string;
    text: string;
    time: string;
  }[];
}

export interface BusSharingRequest {
  id: string;
  requestingInstitute: string;
  contactPerson: string;
  contactPhone: string;
  requiredDate: string;
  passengersCount: number;
  busesNeeded: number;
  seatingCapacityType: '32 Seater' | '45 Seater' | '60 Seater High Capacity';
  pickupLocation: string;
  destinationLocation: string;
  eventPurpose: string;
  status: 'Open for Bids' | 'Allocated' | 'Trip Completed' | 'Cancelled';
  bidsReceived: {
    id: string;
    providingInstitute: string;
    busesOffered: number;
    quoteAmount: number;
    driverDetailsIncluded: boolean;
    fuelPolicy: string;
    status: 'Pending' | 'Accepted' | 'Declined';
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'admission' | 'recruitment' | 'social' | 'bus' | 'system';
  timestamp: string;
  read: boolean;
}
