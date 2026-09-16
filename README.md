# Story App

Story App is a client-side web application for discovering and sharing stories
with photos. It was created as a Dicoding submission and uses the Dicoding
Story API as its backend.

[Story App - Firebase Website](https://storyapp-565.web.app/)

## Features

- User registration and login.
- Displaying the latest stories from the API.
- Searching stories by author name or description.
- Viewing story details in a modal.
- Creating stories with a description and photo.
- Photo preview before submission.
- Form validation, including image type and file size validation (maximum 1 MB).
- Logout and expired-session handling.
- Responsive layout with an offcanvas menu on small screens.
- Three supported languages: Indonesian (`id`), English (`en`), and Spanish
  (`es`).
- Locale-aware date formatting.
- User interface components built with Lit Web Components.
- Basic accessibility support through form labels, loading states, and ARIA
  attributes.

## Deployment

The project is configured for Firebase Hosting, with production files generated
in the `dist/` directory.

The repository includes these GitHub Actions workflows:

- `.github/workflows/firebase-hosting-pull-request.yml`: creates a preview
  deployment for pull requests from the same repository.
- `.github/workflows/firebase-hosting-merge.yml`: deploys the application after
  changes are merged into the `main` branch.

## Technology stack

- JavaScript ES Modules.
- [Lit](https://lit.dev/) for Web Components and UI rendering.
- [Vite](https://vite.dev/) for development and production builds.
- [Bootstrap](https://getbootstrap.com/) for components and layout utilities.
- Sass for modular stylesheets.
- Axios for HTTP communication.
- `@lit/localize` for localization.
- Firebase Hosting for deployment.
- ESLint with Lit and Web Components plugins.

## Prerequisites

- Node.js LTS (Node.js 20 or newer is recommended).
- npm.
- Internet access to reach the Dicoding Story API.

Check the installed versions:

```bash
node --version
npm --version
```

## Installation

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/mlkav/565-storyapp.git
   cd 565-storyapp
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL displayed by Vite, usually
   `http://localhost:5173`.

The API base URL is configured in `src/js/api/axios-instance.js`:

```text
https://story-api.dicoding.dev/v1
```

## npm scripts

| Command                    | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `npm run dev`              | Starts the Vite development server.                    |
| `npm run build`            | Creates a production build in `dist/`.                 |
| `npm run preview`          | Serves the production build locally.                   |
| `npm run lint`             | Lints JavaScript files in `src/`.                      |
| `npm run lint:fix`         | Automatically fixes supported lint issues.             |
| `npm run format`           | Formats supported project files with Prettier.         |
| `npm run format:check`     | Checks formatting without changing files.              |
| `npm run localize:extract` | Extracts localization messages into XLIFF files.       |
| `npm run localize:build`   | Generates compiled locale modules in `src/generated/`. |

Recommended validation before submitting changes:

```bash
npm run lint
npm run format:check
npm run build
```

The project does not currently define an automated test script in
`package.json`.

## Using the application

1. Open **Register** and create an account with a name, email, and password.
2. Sign in with the new account.
3. Use the search field on the dashboard to filter stories.
4. Select **View details** on a story card to open its full description and
   coordinates, when available.
5. Select **Write a story**, enter a description of at least 10 characters, and
   choose an image file no larger than 1 MB.
6. Submit the story with **Publish story**.
7. Use the language selector in the header to switch between `ID`, `EN`, and
   `ES`.
8. Open the profile menu to view the developer profile or log out.

## Application routes

The application uses hash-based routing and therefore does not require
server-side rewrites:

| Hash         | Page                     | Access                  |
| ------------ | ------------------------ | ----------------------- |
| `#/login`    | Login                    | Public                  |
| `#/register` | Registration             | Public                  |
| `#/`         | Dashboard and story list | Requires authentication |
| `#/add`      | Add story form           | Requires authentication |
| `#/profile`  | Developer profile        | Requires authentication |

Unauthenticated users are redirected to `#/login`. Authenticated users cannot
open the login or registration pages.

## API integration

All requests use an Axios instance configured with the base URL
`https://story-api.dicoding.dev/v1`. After login, the authentication token is
sent in the `Authorization` header using the bearer scheme.

| Method | Endpoint            | Description                                           |
| ------ | ------------------- | ----------------------------------------------------- |
| `POST` | `/register`         | Creates a new account.                                |
| `POST` | `/login`            | Starts a session and returns an authentication token. |
| `GET`  | `/stories?size=100` | Retrieves the story list.                             |
| `POST` | `/stories`          | Creates a story using `multipart/form-data`.          |

For payload and response details, see the official
[Dicoding Story API documentation](https://story-api.dicoding.dev/).

When the API returns status `401`, the Axios interceptor clears the local
session and redirects the user to the login page. API error messages are shown
on the relevant page.

## Project structure

```text
.
├── public/                 # Static assets, including the favicon
├── src/
│   ├── generated/          # Generated translation modules
│   ├── js/
│   │   ├── api/            # Axios instance and endpoint functions
│   │   ├── components/     # Reusable Lit Web Components
│   │   ├── pages/          # Page renderers
│   │   └── utils/          # Auth, storage, date, and i18n utilities
│   ├── locales/            # Locale message sources
│   ├── scss/               # Global styles and Sass partials
│   └── xliff/              # English and Spanish translations
├── .github/workflows/      # Firebase Hosting workflows
├── dist/                   # Vite build output
├── firebase.json           # Firebase Hosting configuration
├── index.html              # HTML entry point
├── package.json            # Scripts and dependencies
└── vite.config.js          # Vite and Sass configuration
```

## Architecture overview

- `src/js/index.js` registers components, creates the application shell, and
  runs the hash router.
- Renderers in `src/js/pages/` populate the `#page` element for each route.
- Components in `src/js/components/` use Lit. Some components use the light DOM
  so they can use Bootstrap utilities.
- `src/js/utils/auth.js` stores the authentication token and user name in
  `localStorage` using the keys `story-app-token` and `story-app-user`.
- The selected locale is stored under `story-app-locale`. Indonesian is the
  default locale.
- Photos and descriptions are sent directly to the Story API; the application
  does not provide its own server or database.

## Localization

Indonesian (`id`) is the source locale. Translations are managed with
`@lit/localize`:

1. Update source messages in `src/js/utils/i18n.js`.
2. Run `npm run localize:extract`.
3. Update the target translations in `src/xliff/en.xlf` and
   `src/xliff/es.xlf`.
4. Run `npm run localize:build`.
5. Verify the result with `npm run build`.

Files in `src/generated/` are generated automatically and should not be edited
manually.

## Manual Firebase deployment

After installing and configuring the Firebase CLI for the target project, run:

```bash
npm ci
npm run build
firebase deploy --only hosting
```

The deploy command reads `firebase.json` and publishes the `dist/` directory.
The GitHub Actions workflows use the same build and hosting configuration.

## Troubleshooting

### Stories do not load

- Make sure the development server has internet access.
- Check the connection to `https://story-api.dicoding.dev/v1`.
- Make sure the current session is still valid. A `401` response requires
  signing in again.

### Photo upload is rejected

- Make sure the selected file is an image.
- Make sure the file is no larger than 1 MB.
- Make sure the description contains at least 10 characters.
