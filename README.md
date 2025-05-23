# Next.js HR Dasboard

A modern web application built with Next.js, featuring a dynamic user feed, robust filtering, search capabilities, a tabbed information display, and secure authentication using NextAuth.js.

## ✨ Features

* **Dynamic User Feed**: Displays a list of users.

![Dashboard](/image/dashboard.png)
* **Search Functionality**: Efficiently search users by name, email, or department.
* **Multi-Criteria Filtering**: Filter the user list by department and a dynamically generated rating.

![Filtering](/image/filtering.png)

* **Bookmark Manager**: A link to a bookmark manager page, where we can see all bookmarked employee

![Bookmark Manager](/image/bookmark.png)
* **Analytics Dashboard**: A link to an analytics dashboard page

![Filtering](/image/analytics.png)
* **Tabbed UI**: An interactive tabbed interface (`Overview`, `Projects`, `Feedback`) for displaying different types of information.
    * **Overview Tab**: Dynamically fetches and displays statistics about users.

    ![Overview](/image/overview.png)
    * **Projects Tab**: Displays a list of projects.

    ![Project tab](/image/projects.png)
    * **Feedback Tab**: Displays a list of feedback entries.

    ![Feedback Tab](/image/feedback.png)
    * Dynamic sizing of content within scrollable tabs to control visibility of items.
* **Responsive Design**: Built with Tailwind CSS for a mobile-first and responsive user interface.
* **Dark Mode Support**: Seamless dark mode integration for enhanced user experience.

## 🚀 Technologies Used

* **Next.js 14+ (App Router)**: React framework for building server-side rendered and static web applications.
* **React.js**: JavaScript library for building user interfaces.
* **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

## 🔧 Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (v18.x or later recommended)
* npm (v8.x or later) or Yarn (v1.x or later)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/anupamaminj/hr_dashboard.git
    cd hr_dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

## ▶️ Running the Project

To start the development server:

```bash
npm run dev
# OR
yarn dev



