import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";




export class HandleErrorDbUtil {


    private static readonly logger = new Logger('HandleErrorDbUtil'); 


  static handle(error: any): never {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } 
    
    if (error.code === '23503') {
      throw new BadRequestException(error.detail);
    } 
    
    if (error.code === '22P02') {
      throw new BadRequestException(error.detail);
    } 
    
    HandleErrorDbUtil.logger.warn('Unhandled database error code:', error.code || 'No code', error);
    throw new InternalServerErrorException('An error occurred while processing your request');
    
  }
}

// This class is a static method, dont need to instantiate it. 
// For usarge, simply call HandleErrorDbUtil.handle(error) in your service methods where you want to handle database errors.

// This utility class is designed to handle database errors in a consistent manner across the application.
// It checks for specific error codes and throws appropriate exceptions, while also logging the error for debugging purposes.
// The static method `handle` can be used in various service methods to manage database-related errors.