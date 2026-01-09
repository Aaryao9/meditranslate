// src/domains/auth/services/auth.service.js
import { UserRepository } from '../../user/repositories/user.repository.js';
import { hashPassword, comparePassword } from '../../../shared/utils/hash.util.js';
import { generateToken, generateRefreshToken } from '../../../shared/utils/jwt.util.js';
import { UnauthorizedError, ConflictError } from '../../../shared/exceptions/index.js';
import { RegisterUserDTO, RegisterResponseDTO } from '../dto/register.dto.js';
import { LoginResponseDTO } from '../dto/login.dto.js';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  
  async register(registerData) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmailWithoutPassword(registerData.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await hashPassword(registerData.password);
    
    // Create user
    const userData = new RegisterUserDTO(
      registerData.email,
      hashedPassword,
      registerData.fullName
    );
    
    const user = await this.userRepository.create(userData);
    
    // Generate tokens
    const token = generateToken({ userId: user._id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user._id });
    
    return new RegisterResponseDTO(user, token, refreshToken);
  }
  
  async login(loginData) {
    // Find user with password
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    
    // Check if account is active
    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }
    
    // Verify password
    const isPasswordValid = await comparePassword(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }
    
    // Update last login
    await this.userRepository.updateLastLogin(user._id);
    user.lastLogin = new Date();
    
    // Generate tokens
    const token = generateToken({ userId: user._id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user._id });
    
    return new LoginResponseDTO(user, token, refreshToken);
  }
  
  async logout(userId) {
    // In a production system, you would:
    // 1. Invalidate the token (add to blacklist in Redis)
    // 2. Clear refresh tokens
    // For now, we'll just return success
    return { message: 'Logged out successfully' };
  }
}
