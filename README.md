Messenger Application
----
This simple version of messenger chat

https://

----------

Technologies:
-
**Frontend:** Next v15, TypeScript, Prisma, MongoDB, Pusher, Next-Auth, React-Hook-Form, Next-cloudinary, 
              Tailwind, Headlessui, React-Hot-Toast.
**Other:** Git, ESLint, Prettier, Axios, Bcrypt, Date-fns, Next-cloudinary, React-Select, 

------------
Setup and Running
-

**Clone the repository:**
```bash
git clone https://github.com/DennyAge/messenger-app
```

```bash
cd messenger-app
```

**Install dependencies:**

```bash
npm install
```

**Set up environment variables:**

Create a .env file with the following variables (use your data):

```env
DATABASE_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=

NODE_ENV=dev

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

```

**Run the application:**

```bash
npm run dev
```

App will be available at: http://localhost:3000.