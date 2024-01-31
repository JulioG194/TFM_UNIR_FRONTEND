export interface BackendResponse {
    status: number;
    message: string;
    error: string | null;
  }

  export interface AuthResponse {
    status: number;
    message: string;
    data: {
      accessToken: string;
      accessTokenExpiresAt: string;
      refreshToken: string;
      refreshTokenExpiresAt: string;
      user: {
        username: string;
        role: string;
        permissions: string[];
      };
    };
  }