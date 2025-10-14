I have generated the complete starter frontend codebase for your VNC Data Exfiltration Testbed Dashboard. As we encountered issues with running shell commands, I have created all the files directly. Here is a summary of what has been created and how to proceed:

### Project Structure

- **/src/app**: Contains all the pages of your application (Dashboard, Alerts, Sessions, etc.) and the main layout.
- **/src/components**: Contains reusable UI components, with **/src/components/ui** holding the `shadcn/ui` components.
- **/src/features**: Contains components that are specific to a feature, like the form for creating experiments.
- **/src/hooks**: For custom React hooks, like `use-socket` for WebSocket connections.
- **/src/lib**: Contains the API client (`api.ts`), WebSocket setup (`socket.ts`), Zustand store (`store.ts`), and utility functions (`utils.ts`).
- **/tests**: Contains a sample test file to demonstrate the testing setup with Vitest and React Testing Library.
- **Configuration Files**: `tailwind.config.ts`, `next.config.mjs`, `tsconfig.json`, `vitest.config.ts`, etc., are all in the root directory.
- **Dockerfile**: A production-ready Dockerfile is included in the root directory.

### How to Run the Application

1.  **Install Dependencies**:
    Open a terminal in the `vnc-dashboard` directory and run the following command to install all the necessary packages defined in `package.json`:

    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    After the installation is complete, run the following command to start the Next.js development server:

    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

### Next Steps

- **Connect to Backend**: The API client in `src/lib/api.ts` and the WebSocket setup in `src/lib/socket.ts` are currently using mock data and a local URL. You will need to replace these with your actual backend endpoints.
- **Implement Authentication**: The authentication page is a UI stub. You will need to integrate it with your OAuth2/OIDC provider.
- **Expand Features**: You can now build upon the provided structure to add more features and functionality to your dashboard.

This should give you a solid foundation to build the rest of your application. Let me know if you have any other questions.