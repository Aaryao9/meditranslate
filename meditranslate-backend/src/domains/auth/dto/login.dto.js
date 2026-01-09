// src/domains/auth/dto/login.dto.js
export class LoginUserDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

export class LoginResponseDTO {
  constructor(user, token, refreshToken) {
    this.user = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      lastLogin: user.lastLogin
    };
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
