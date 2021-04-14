/**
 * @swagger
 * components:
 *      schemas:
 *          Restaurants:
 *              type: object
 *              required:
 *                -id
 *              properties:
 *                  id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  hash:
 *                      type: String
 *                  geocoords:
 *                      type: String
 *                  address:
 *                      type: string
 *                  menu:
 *                      type: object
 *                      properties:
 *                          menu_size:
 *                              type: integer
 *                          menu_items:
 *                              type: object
 *                              properties:
 *                                  item_name:
 *                                      type: string
 *                                  item_price:
 *                                      type: string
 *                                  item_descriptiom:
 *                                      type: string
 *          Menu:
 *              type: object
 *              properties:
 *                  menu_size:
 *                      type: integer
 *                  menu_items:
 *                      type: object
 *                      properties:
 *                          item_name:
 *                              type: string
 *                          item_price:
 *                              type: string
 *                          item_descriptiom:
 *                              type: string
 *          UpdateRestaurant:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  address:
 *                      type: string
 *          MenuItem:
 *              type: object
 *              properties:
 *                  item_name:
 *                      type: string
 *                  item_price:
 *                      type: string
 *                  item_description:
 *                      type: string
 *          User:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  hash:
 *                      type: string
 *                  email:
 *                      type: string
 *                  cellphone:
 *                      type: string
 *                  owner:
 *                      type: boolean
 *          UserResponse:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 */
/**
 * @swagger
 * tags:
 *  name: Restaurants
 *  description: Restaurants in the DeliveryAPI
 */
/**
 * @swagger
 *  /api/restaurants:
 *      get:
 *         summary: Returns a list with all the restaurants.
 *         tags: [Restaurants]
 *         responses:
 *              200:
 *                  description: List of all restaurants.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                 $ref: '#/components/schemas/Restaurants'
 *      post:
 *          summary: Adds a new restaurant
 *          tags: [Restaurants]
 *          requestBody:
 *              description: Defines the restaurants settings.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Restaurants'
 *          responses:
 *              200:
 *                  description: Adds a new restaurant.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Restaurants'  
 *              404:
 *                  description: Restaurant's object had an error in it. (error coded)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 * 
 * 
 */

/**
 * @swagger
 *  /api/restaurant/{id}:
 *      get:
 *          summary: Returns the specified restaurant.
 *          tags: [Restaurants]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Restaurant ID.
 *          responses:
 *              200:
 *                  description: Returns the specified restaurant.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Restaurants'
 *              404: 
 *                  description: Restaurant not found.
 *      patch:
 *          summary: Updates an existing restaurant name or address. Attention to change a menu item use the correct api.
 *          tags: [Restaurants]
 *          requestBody:
 *              description: Only name and address.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateRestaurant'
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Restaurant ID.
 * 
 * 
 *          responses:
 *              200:
 *                  description: Updates a restaurant's parameters.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Restaurants'
 *              404:
 *                  description: Error while updating a restaurant's parameters.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 *      delete:
 *          summary: Deletes a restaurant.
 *          tags: [Restaurants]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Restaurant ID
 *          responses:
 *              200:
 *                  description: Removes a restaurant.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Restaurants'
 *              404:
 *                  description: Error while updating a restaurant's parameters.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 * 
 */

/**
 *  @swagger
 * 
 * /api/restaurants/closeto/{address}/{radius}:
 *      get:
 *         summary: Returns a list with all the restaurants within a radius.
 *         tags: [Restaurants]
 *         parameters:
 *              - in: path
 *                name: address
 *                schema:
 *                  type: string
 *                required: true
 *                description: Center address.
 *              - in: path
 *                name: radius
 *                schema:
 *                  type: integer
 *                required: true
 *                description: Max distance from the center.
 *         responses:
 *              200:
 *                  description: List of all restaurants.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                 $ref: '#/components/schemas/Restaurants'
 *              404:
 *                  description: Restaurant's object had an error in it. (error coded)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 * /api/restaurants/menu/{id}/{item_pos}:
 *      get:
 *         summary: Returns the menu of a restaurant's by id
 *         tags: [Restaurants]
 *         parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Restaurant's ID
 *              - in: path
 *                name: item_pos
 *                schema:
 *                  type: integer
 *                required: false
 *                description: Menu item's position on the array.
 *         responses:
 *              200:
 *                  description: Restaurant's menu.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                 $ref: '#/components/schemas/Menu'
 *              404:
 *                  description: Menu's object has an error. (error coded)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 *      post:
 *         summary: Returns the menu of a restaurant's by id after adding an item.
 *         tags: [Restaurants]
 *         requestBody:
 *             description: A menu item, its name, price and a description.
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/MenuItem'
 *         parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Restaurant's ID
 *              - in: path
 *                name: item_pos
 *                schema:
 *                  type: integer
 *                required: false
 *                description: Menu item's position on the array.
 *         responses:
 *              200:
 *                  description: Restaurant's menu.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                 $ref: '#/components/schemas/Menu'
 *              404:
 *                  description: Menu's object has an error. (error coded)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 *      patch:
 *         summary: Returns the menu of a restaurant's by id after updating an item.
 *         tags: [Restaurants]
 *         parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Restaurant's ID
 *              - in: path
 *                name: item_pos
 *                schema:
 *                  type: integer
 *                required: true
 *                description: Menu item's position on the array.
 *         requestBody:
 *             required: true
 *             description: A menu item, its name, price and a description.
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/UpdateRestaurant'
 *         responses:
 *              200:
 *                  description: Restaurant's menu.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                 $ref: '#/components/schemas/Menu'
 *              404:
 *                  description: Menu's object has an error. (error coded)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 *      delete:
 *         summary: Returns the menu of a restaurant's by id after deleting an item.
 *         tags: [Restaurants]
 *         parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Restaurant's ID
 *              - in: path
 *                name: item_pos
 *                schema:
 *                  type: integer
 *                required: true
 *                description: Menu item's position on the array.
 *         responses:
 *              200:
 *                  description: Restaurant's menu.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                 $ref: '#/components/schemas/Menu'
 *              404:
 *                  description: Menu's object has an error. (error coded)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:  
 *                                  status: 
 *                                      type: string
 *                                  error: 
 *                                      type: string
 * /api/user/{name}/{password}:
 *      get:
 *          tags: [Users]
 *          summary: Checks if the user is already in the database.
 *          parameters:
 *            - in: path
 *              name: name
 *              schema: 
 *                  type:string
 *              required: true
 *            - in: path
 *              name: password
 *              schema:
 *                  type: string
 *              required: true
 *          responses:
 *              200:
 *                  description: Users does exist.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: Array
 *                              items:
 *                                  $ref: '#/components/schemas/UserResponse'
 *              404:
 *                  description: User doesn't exist.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: Array
 *                              items:
 *                                  $ref: '$#/components/schemas/UserResponse'
 *                                       
 *      post:
 *          tags: [Users]
 *          summary: Adds a new user.
 *          requestbody:
 *              
 *          respnses:
 *              200:
 *                  description: User created.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: Array     
 *                              items:
 *                                  $ref: '#/components/scheams/UserResponse'      
 *              400:
 *                  description: User could not be created.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: Array
 *                              items:
 *                                  $ref: '#/components/scheams/UserResponse'
 */