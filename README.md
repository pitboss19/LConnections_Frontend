# **Local Connections Website**

![Picture of website](https://i.imgur.com/FB1Btw6.png)

## **Project**

A local company was looking to create a website that can showcase their company's services, reputation, and also be able allow customers to schedule services, manage invoices, and have online payment processing. They wanted to ensure that their portal was secure, not handling card information on their servers, and be a fluid experience on both mobile and browsers.

## **ERD Final**

![ERD showing all routes](https://i.imgur.com/Tj1csgk.png)

## **User Stories**

- A customer is looking for a cleaning company and wants to see what services Local connections offers.
- A repeat customer is looking to schedule their monthly cleaning and doesn't like to talk on the phone.
- A customer that likes to keep organization of their receipts would like access to digital invoices.
- A customer is attempting to signup for a local connections membership that will autodraft from their account each renewal period.
- A customer would like to receive notifications on membership renewal or cleaning reminders

## **Tech Stack**

- MongoDB
- React
- Apollo
- GraphQL

#### **Additional Node Packages**
- Mongoose (ODM)
- StripeJS (Payment Processing)
- Twilio (Alerts / Reminder SMS System)
- MaterialUI (UI / Framework)
- UI Pickers (Calendar)
- MomentJS (Date Formatting)
- CookieJS (Token Storage)
- React-StripeJS (StripeJS Elements for React)

## **Daily Sprints (Sept. 26 - Oct. 2)**

- Saturday
  - Develop typeDefs (Definition of return data) for routes
  - Plan / Design necessary data flow for each page required
  - Build framework for Apollo

- Sunday
  - Develop resolvers (Server gathering of return data) for routes
  - Plan / Design endpoints for hitting routes
  - Build Models for Mongoose

- Monday
  - Develop scheduling routes (Create, Read, Update, Delete Cleanings)
  - Develop SMS on created cleaning
  - Plan / Design process for invoice routes (Create, Read, Update)

- Tuesday
  - Develop invoice routes (Create, Read, Update)
  - Develop payment method routes (Create, Update, Delete)
  - Implement SMS on invoice create / paid

- Wednesday
  - Develop Front Page
  - Develop Auth Modal
  - Develop Header

- Thursday
  - Develop Profile Page
  - Develop Payment Method Modals
  - Develop Invoice Modals
  - Develop Cleaning Form
  - Integrate GraphQL Queries / Mutations to FrontEnd

- Thursday Night to Friday Morning
  - Bug fix backend
  - Integrate payment processing into front site (Stop using stripe urls)
  - Utilize profile loading to change status of paid invoices (Backend)
  - Blockout dates for over 2 bookings scheduled (Frontend/Backend)

## **Problems in Development / General Approach**

### **How to handle payment processing**

So this took a bit to planout and design. I needed to allow users to add payment methods to their account while making sure my server never gets their card information but still be able to take payments. I ended up going with stripe for various reasons but one being their api integrates well with react. I had a couple blockers trying to figure out how to create the payment on the backend but eventually resolved them through their VERY vague docs. The react component turns the card information into a encoded string by sending their data from client to stripe and sending me their encoded string to association the information stored on stripe to my payment methods for each customer.

### **How to allow login from any page without breaking flow**

I wanted to focus on userflow in the website for this project. One key thing in my mind was ensuring a user can login from anywhere without redirecting, changing pages, or breaking their process on the webpage. I ended up struggling intially getting this working and had to refactor each design multiple times where I got to the point with a modal that covers the top half of the website and then disappears after logging in.

### **Popup modals with responsive sizing**

For this website to be useful to all customers I wanted to make sure that anything used on the browser can be used on the phone. I originally tried repurposing my login / signup modal but ended up ditching it in favor of Material UI's dialog component. It has the ability to reponsively change depending on the size of the screen. Originally using the login modal it would have missized form inputs, and just bad sizing on mobile. Switch to Material UI dialog allowed for same sizing across screens.

### **How to block out dates with 2 cleanings scheduled**

So this one was interesting, I had to find a material ui addon package that allows for date blocking conditionally. Once I had that setup I needed to add new information to my user route that I could query on the frontend without exposing other users information. When a user requests their date and bookedDates, I query all cleanings on the backend then aggregate them by book date and count all cleanings by date. Any date that has 2 or more cleanings will be blocked from being selected, this is by using the blockedDates array and passing it to the disableDates props in UI Picker Datetime component.

## **Unsolved Problems / TO DOS**

### **Employee Portal**

Sadly there was too much for me to do in one week, to preserve the quality of my design I pushed the employee portal to a stretch goal that I'll be finishing next week to finish off the site. This portal will need more security, 2Auth Login (Customer information being visible should always require 2Auth), Invoice building (Multiple components, line by line generation), Subscription handling, custom scheduling options (Vacation block outs, etc). I'm looking forward to finishing this piece as it will really tie all of the site together.

### **Notification toggling**

Everyone knows that one thing people hate is unwanted text messages, unfortunately I did get a chance to add the settings page to allow customers to enable / disable text notifications. These are enabled by default for presentation purposes but plan on making it disabled by default and encouraging them to enable upon first login.

### **Edit user info**

I need to add in a frontend connection / page to allow users to update their information as needed.

### **React Errors / Unused imports / console.log**

Before deploying this site live I need to clean out any console logs I've left in, unused imports, switch destructured imports to specific file imports (Loading useless packages). I've also noticed some errors about divs in p tags so I'll need to read up on the Material UI docs more to figure out where this error could be originating from.


