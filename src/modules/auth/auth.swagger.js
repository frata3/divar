/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth module and routes
*/
/**
 * @swagger
 *  components:
 *      Schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string 
 *                      example: ""
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string 
 *                      example: ""
 *                  code:
 *                      type: string 
 *                      example: ""
*/

/**
 * @swagger
 * 
 * /auth/send-otp:
 *  post:
 *      summary: login with OTP in this end-point
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/Schemas/SendOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/Schemas/SendOTP"        
 *      responses:
 *          200:
 *              description: success
*/
/**
 * @swagger
 * 
 * /auth/check-otp:
 *  post:
 *      summary: check otp for login user 
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/Schemas/CheckOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/Schemas/CheckOTP"        
 *      responses:
 *          200:
 *              description: success
*/
/**
 * @swagger
 * 
 * /auth/logout:
 *  get:
 *      summary: logout user
 *      tags:
 *          -   Auth    
 *      responses:
 *          200:
 *              description: success
*/