// Base Response DTO Class
class BaseResponseDto {
    success: boolean;
    message: string;
    timestamp: string;
    statusCode: number;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(json: any) {
      this.success = json?.success || false;
      this.message = json?.message || "";
      this.timestamp = json?.timestamp || new Date().toISOString();
      this.statusCode = json?.statusCode || 200;
    }
  
    // Helper method to parse numbers safely
    protected parseNumber(value: any, defaultValue: number = 0): number {
      const parsed = Number(value);
      return isNaN(parsed) ? defaultValue : parsed;
    }
  
    // Helper method to parse boolean safely
    protected parseBoolean(value: any, defaultValue: boolean = false): boolean {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true' || value === '1';
      }
      return defaultValue;
    }
  
    // Helper method to parse string safely
    protected parseString(value: any, defaultValue: string = ""): string {
      return value?.toString() || defaultValue;
    }
  }
  
  // Success Response DTO
  class SuccessResponseDto<T = any> extends BaseResponseDto {
    data: T;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(json: any) {
      super(json);
      this.success = true;
      this.data = json?.data;
    }
  
    static create<T>(
      data: T,
      message: string = 'Operation successful',
      statusCode: number = 200
    ): SuccessResponseDto<T> {
      return new SuccessResponseDto({
        success: true,
        message,
        data,
        statusCode,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // Error Response DTO
  class ErrorResponseDto extends BaseResponseDto {
    error: string;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(json: any) {
      super(json);
      this.success = false;
      this.error = json?.error || json?.message || "An error occurred";
    }
  
    static create(
      message: string,
      error: string = 'Internal server error',
      statusCode: number = 500
    ): ErrorResponseDto {
      return new ErrorResponseDto({
        success: false,
        message,
        error,
        statusCode,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // Paginated Response DTO
  class PaginatedResponseDto<T = any> extends BaseResponseDto {
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(json: any) {
      super(json);
      this.success = true;
      this.data = json?.data || [];
      this.pagination = {
        currentPage: this.parseNumber(json?.pagination?.currentPage, 1),
        totalPages: this.parseNumber(json?.pagination?.totalPages, 1),
        totalItems: this.parseNumber(json?.pagination?.totalItems, 0),
        itemsPerPage: this.parseNumber(json?.pagination?.itemsPerPage, 10),
        hasNext: this.parseBoolean(json?.pagination?.hasNext, false),
        hasPrevious: this.parseBoolean(json?.pagination?.hasPrevious, false)
      };
    }
  
    static create<T>(
      data: T[],
      pagination: PaginatedResponseDto<T>['pagination'],
      message: string = 'Data retrieved successfully',
      statusCode: number = 200
    ): PaginatedResponseDto<T> {
      return new PaginatedResponseDto({
        success: true,
        message,
        data,
        pagination,
        statusCode,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // List Response DTO (for simple arrays without pagination)
  class ListResponseDto<T = any> extends BaseResponseDto {
    data: T[];
    count: number;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(json: any) {
      super(json);
      this.success = true;
      this.data = json?.data || [];
      this.count = this.parseNumber(json?.count, this.data.length);
    }
  
    static create<T>(
      data: T[],
      message: string = 'Data retrieved successfully',
      statusCode: number = 200
    ): ListResponseDto<T> {
      return new ListResponseDto({
        success: true,
        message,
        data,
        count: data.length,
        statusCode,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  export { 
    BaseResponseDto, 
    SuccessResponseDto, 
    ErrorResponseDto, 
    PaginatedResponseDto,
    ListResponseDto 
  };