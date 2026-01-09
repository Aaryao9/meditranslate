// src/domains/auth/controllers/auth.controller.js
import { AuthService } from '../services/auth.service.js';
import { successResponse } from '../../../shared/utils/response.util.js';

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  
  register = async (req, res, next) => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(successResponse(result, 'Registration successful'));
    } catch (error) {
      next(error);
    }
  };
  
  login = async (req, res, next) => {
    try {
      const result = await this.authService.login(req.body);
      res.status(200).json(successResponse(result, 'Login successful'));
    } catch (error) {
      next(error);
    }
  };
  
  logout = async (req, res, next) => {
    try {
      const result = await this.authService.logout(req.user.userId);
      res.status(200).json(successResponse(result, 'Logout successful'));
    } catch (error) {
      next(error);
    }
  };
}
