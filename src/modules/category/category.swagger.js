/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category module and routes
*/

/**
 * @swagger
 *  components:
 *      Schemas:
 *         CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      example: ""
 *                      type: string
 *                  slug:
 *                      example: ""
 *                      type: string
 *                  icon:
 *                      example: ""
 *                      type: string
 *                  parent:
 *                      example: ""
 *                      type: string
 *                  
*/

/**
 * @swagger
 * /category:
 *  post:
 *      summary: create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/Schemas/CreateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/Schemas/CreateCategory"        
 *      responses:
 *          201:
 *              description: created
*/

/**
 * @swagger
 * /category:
 *  get:
 *      summary: get all categorys
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description: success
*/
/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: delete category
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *      responses:
 *          200:
 *              description: success
*/