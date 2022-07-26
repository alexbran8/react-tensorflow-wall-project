
1. Plan key functionality and features of the web app
        • Mo — Must have features
        • S — Should have features
        • Co — Could have features
        • W — Won’t need features



2. project training
    
    MANDATORY:
        - deploy to gh-pages: https://www.c-sharpcorner.com/article/how-to-deploy-react-application-on-github-pages/

        - https://www.npmjs.com/package/@tensorflow/tfjs
        - https://towardsdatascience.com/ow-to-use-tensorflow-js-in-react-js-object-detection-98b3782f08c2
        - A 15-Step Guide on How to Build a Web App: https://www.netsolutions.com/insights/how-to-build-a-web-app/
        - How to Create a Web Application: In-Depth Guide About Development Process: https://spdload.com/blog/how-to-develop-a-web-application/

    
    RECOMMENDED:
        - Deploying to GitHub Pages: https://www.codecademy.com/article/f1-u3-github-pages
        - Progressive web app: https://www.techtarget.com/whatis/definition/progressive-web-app-PWA
        - How to build a Progressive Web App: https://www.creativebloq.com/how-to/build-a-progressive-web-app
        - How to Make a Progressive Web App From Your Existing Website: https://blog.heroku.com/how-to-make-progressive-web-app

    OPTIONAL:
     

    


3. Work on the Design
4. Start the Development
• Progressive Web App
- Server over HTTPS
- Create an application shell
- Register a service worker
- Add push notifications
- Add a web app manifest
- Configure the install prompt
5. Testing the Application
6. Deploy
• Deploying to GitHub Pages

Project Development Schedule:
    
    1. check out how to make application show notification when new version is available (S)   
    2. Configure testing using JEST / Cypress (TODO: study about differences and what tests would be necessary)
    3. Implement mobile-detect module to check if app is being opened from mobile or desktop based on OS - TBD
    4. Implement camera disable - TBD (may need another module for camera to be used)
    5. Implement image responsibe resize based on device properties !!! not affect image quality - Roxana
        => how to resize image to fit any display?
        => image needs to be centered horizontally at all times
        => Future implementation: check how to do it for multiple images.
