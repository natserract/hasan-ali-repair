# Hasan Ali Vehicle Repair

Booking appointments application systems for motorcycle and car repair shops.

**NOTES:** semi automatic booking system

## Goal of This App.
Hasan Ali Repair is a digital solution to help customers make it easier and more efficient to service their vehicles. To place an order, customers just need to choose the available schedule and time through the application, then come for a vehicle check then if all agree, then the vehicle is ready for service. When finished, the customer will receive a confirmation by the system and email, without having to wait in line. All modules and features are systematically designed to make it easier for the store and customers.

## Table of Contents ##
1. [MVP](#mvp-minimum-viable-product)
2. [Validation and Rules](#validation-and-rules)
3. [Stacks Used](#stacks-used)
4. [System requirements](#system-requirements)
5. [Setup](#setup)
6. [Third party]()
7. [Future Works]()
8. [FAQs]()
9. [References]()

## MVP (Minimum Viable Product)
> A minimum viable product or MVP is a product with a basic set of features that are considered unique enough to attract the attention of users

![Screen Shot 2022-03-16 at 4 58 42 PM](https://user-images.githubusercontent.com/31182611/158553734-824f1618-8a19-4979-b6a2-d59bc621473a.png)

System must be able to:
- Customers can create their own accounts and can login into their accounts
- Allow a customer to book a service for a particular time and date
- Allow a customer to book with multiple vehicles
- Update a booking, for example if the customer wants to change a booking time (if the status is pending)
- Display a list of bookings for a given date, approved services, and vehicles

## Validation and Rules
- Maximum customer booking in a day is **20** services
- The email registered by the customer must be a `gmail` . account
- Mechanic must include NIK/KTP/person id for identity security
- If the status is still pending, the customer can still update the booking. Such as rescheduling, changing vehicles, etc
- If today's schedule is full, the customer cannot register/make a booking schedule
- On the `bookings` page, if the status is other than **pending, approved, unapproved** then (as admin) the status cannot be updated, because bookings are only for handling pending, approved, and unapproved statuses
- Users are allowed to update their profile, except for the email address
- (As admin) on the **users page**, can't delete the data itself in the table
- (As admin) when the currently logged in user updates the profile, the user is required to log out
- Customers cannot book the day before today
- Services will be made only for bookings whose status is approved
- User's session period is 1 day
- Customers allowed to multiple booking in different date, but customers can't book/service same vehicle on the scheduled date.
- Better (important) customer book date 3 days before take services

## Stacks Used

Here's a several technologies what we used in this project:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/) ([GraphQL Helix](https://github.com/contrawork/graphql-helix) + [Envelop](https://www.envelop.dev) + [Apollo Client](https://www.apollographql.com/docs/react))
- [Prisma](https://www.prisma.io/)
- [RedwoodJS](https://redwoodjs.com/) *(with custom)*
- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)
- [Webpack](https://webpack.js.org/)
- [Material UI 4](https://v4.mui.com)

## System requirements
For running the project locally the following requirements should be met.
- NodeJS 14+
- MySQL
- Apache Server
- Yarn should be globally installed.

## Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn rw dev
```
