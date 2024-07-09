import { FastifyReply } from 'fastify';
import { badRequestType } from '../schemas/badRequestSchema';

// Custom error class representing a BadRequest
class BadRequest extends Error {
  private errors: badRequestType;

  constructor(errors: badRequestType) {
    // Call the parent class constructor (Error) with the provided message
    super(errors.message);
    // Set the name of the error class to 'BadRequest'
    this.name = 'BadRequest';
    // Assign the errors object to the 'errors' property of the instance
    this.errors = errors;
  }

  // Method to format the response with the BadRequest error details
  sendErrors(reply: FastifyReply) {
    // Return the formatted response object
    return reply.status(this.errors.statusCode).send(this.errors);
  }
}

// Export the BadRequest class as default
export default BadRequest;
