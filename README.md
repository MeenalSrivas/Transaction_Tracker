This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

🚀 Getting Started
Follow these steps to set up and run the Transaction Tracker application locally.

1. Prerequisites
Before starting, ensure you have the following installed on your system:

Node.js (LTS version recommended)

MongoDB Instance (local or cloud-hosted service like MongoDB Atlas)

Installation
Clone the Repository:
git clone [Your Repository URL]
cd [repository-name]

Install Dependencies:
npm i

-------------------------------------------------------------------------------------------------
Environment Variables
Create a file named .env.local in the root directory of the project. This file will store your sensitive configuration details.


# DATABASE CONFIGURATION(.env.local)

MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=ma

Note: The package.json suggests the use of mongodb and mongoose. Ensure your MONGODB_URI is correctly formatted.

Running the Application
Start the Development Server:
npm run dev




