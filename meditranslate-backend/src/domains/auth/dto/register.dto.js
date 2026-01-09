// src/domains/auth/dto/register.dto.js
export class RegisterUserDTO {
  constructor(email, password, fullName) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
  }
}

export class RegisterResponseDTO {
  constructor(user, token, refreshToken) {
    this.user = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    };
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
