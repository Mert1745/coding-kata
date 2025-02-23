[![Introduction](https://img.youtube.com/vi/kHfDTYFxHCI/0.jpg)](https://youtu.be/kHfDTYFxHCI)

### Tech Stack

 - Java 17
 - Spring Boot 3.4.2
 - Spring Data
 - H2
 - Angular 17
 - TypeScript

### Prerequisites

 - JDK 17
 - Node >= 18

### Possible Improvements

 - A Loading spinner should be added while the user waits for response from the server
 - Endpoint can have /api/v1 prefixes for future uses
 - Static images should be taken from a CDN service rather than being kept it in frontend.
 - Frontend and backend codebase should be in separate repositories.
 - TypeScript type "number" is not a secure option for calculating prices. Alternatives should be searched and used
 - Docker can be used for fast deployment on both local and server
 - Documentation libraries such as Swagger can be added

### How To Build and Run (Backend)

  - Clone the project
  - Install dependencies using Maven
  - Start Spring Boot application

### How To Build and Run (Frontend)

  - Open CLI and go to kata-frontend directory  
  - Run "npm install"
  - Then run "ng serve"

### Long-Term Considerations

 - H2 database is not a solution for real life apps. PostreSQL can be used as a relational database.
 - An admin portal should exist for product management (adding/subtracting new products, changing price/offers)
 - Caching service should be applied for fast response. The most viewed products should be cached
 - User login
 - Pagination should be implemented
 - If the web-site is being used on different countries, geo-based caching and server management should be considered.
 - Localization is needed if there are users that don't understand English 
 - User behaviours should be tracked and showed in monitoring tools.
 - Error/Success rate should be tracked to control how resilient the app is
 - After having many features, an introductory pop-up guide will be necessary. 

### Stories

**HAIILO-1:** Integrate backend and frontend

**HAIILO-2:** User should be able to see products and prices/offer

**HAIILO-3:** User should be able to add products to cart

**HAIILO-4:** User should be able to buy products in cart

----------------------------------
# Coding Kata

All technical interviews taken with _Haiilo_ will be performed in the same manner, in order to minimise variance in the recruitment process. This should ensure the interview process is fair to the candidates, and also that _Haiilo_ do not miss opportunities to hire good candidates.

The interview exercise that we will use during in person technical interviews is the "Checkout Kata", which is described below, with annotations. The wording of the kata has been carefully crafted to provide a specific set of challenges and crutches to a candidate.

## The Excercise:

### Implement the code for a supermarket checkout that calculates the total price of a number of items.

### Items each have their own price, which can change frequently.

### There are also weekly special offers for when multiple items are bought.

### An example of this would be "Apples are 50 each or 3 for 130".

### The pricing table example:

| Item   |Price for 1 item | Offer                |
|--------|-----------------|----------------------|
| Apple  | 30              | 2 for 45             |
| Banana | 50              | 3 for 130            |
| Peach  | 60              |  -                   |
| Kiwi   | 20              |  -                   |

The checkout accepts the items in any order, so that if we scan an apple, a banana and another apple, we'll recognise two apples and apply the discount of 2 for 45.

Please work as you would do in your usual job. We don't accept one single commit. We want to see the steps you would do usually.
