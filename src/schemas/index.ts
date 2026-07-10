// A single date entry inside a webinar's dates array
interface WebinarDate {
    date: string;   // e.g., "2026-06-28 19:00:00"
    jdate: string;  // e.g., "1405-04-07 00:00:00"
  }
  
  // Details of a specific webinar within a month
  interface WebinarDetail {
    count: number;
    dates: WebinarDate[];
  }
  
  // A single report item (one teacher's data)
  export interface ReportItem {
    students_count: number;
    refunded_students_count: number;
    with_account_students_count: number;
    with_requested_for_account_students_count: number;
    with_income_students_count: number;
    first_income_students_count: number;
    students_total_income: number;          // Can be integer or float
    register_to_account_rate: number;       // Percentage (e.g., 27.27)
    account_to_income_rate: number;         // Percentage (e.g., 104.17)
    with_income_students_in_month: number;
    
    // Dynamic keys: webinar names (strings) map to WebinarDetail.
    // Empty object `{}` is perfectly valid here.
    webinars_in_month: Record<string, WebinarDetail>;
    
    total_webinars_in_month: number;
    teacher_uuid: string;                  // UUID format
    teacher_name: string;
    teacher_share: number;                 // Can be large integer (e.g., 2120718)
  }