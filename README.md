# Swipe4Me

---

# **Meal Swipe Exchange Platform**

## **Project Overview**
The Meal Swipe Exchange Platform is a peer-to-peer web application designed to help Vanderbilt University students make the most of their meal plans. Many students find themselves with unused meal swipes, while others, particularly off-campus students, struggle to access affordable and convenient meals. This platform bridges the gap by enabling students to list, browse, and negotiate meal swipe exchanges, fostering a sustainable and community-driven solution.

---

## **Features**
- **User Authentication:** Students can securely log in using their university credentials.
- **Listing Creation:** Students with extra meal swipes can create listings with details such as price, location, and availability.
- **Browsing and Search:** Users can search for meal swipes based on time, location, or price, and filter listings to suit their preferences.
- **Scheduling:** Built-in scheduling tools to facilitate smooth coordination between users.
- **Notifications:** Alerts for new messages, scheduled exchanges, or updates.
- **Trust and Accountability:** User rating and review system to ensure trust and fair transactions.
- **Donation Option:** Students can donate unused meal swipes to a community pool for those in need.
- **Analytics:** Insights on swipe usage to help users better manage their meal plans.

---

## **Tech Stack**
- **Backend:** Java (Spring Boot) for robust and scalable API development.
- **Frontend:** TypeScript (React) for an interactive and responsive user interface.
- **Database:** PostgreSQL for managing user data, listings, and transactions.
- **Hosting:** Google Cloud Platform (GCP) or Heroku for secure and scalable deployment.
- **Collaboration Tools:** GitHub for version control, Notion for task management, and WeChat for real-time communication.

---

## **Setup Instructions**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo-url.git
   cd meal-swipe-exchange
   ```
2. **Backend Setup:**
   - Ensure Java (JDK 11+) and PostgreSQL are installed.
   - Navigate to the backend folder and run:
     ```bash
     ./mvnw spring-boot:run
     ```
3. **Frontend Setup:**
   - Ensure Node.js and npm are installed.
   - Navigate to the frontend folder and run:
     ```bash
     npm install
     npm start
     ```
4. **Database Configuration:**
   - Update the `application.properties` file with your PostgreSQL credentials.

5. **Run the Application:**
   - Access the platform in your browser at `http://localhost:3000`.

---

## **Project Plan and Progress**
- **Sprint 1:** Core Authentication and Profile System  
- **Sprint 2:** Listing, Browsing, Messaging, and Scheduling Features  
- **Sprint 3:** Trust, Admin Features, Integration, and Deployment  

### **Current Progress:**
- [x] User Authentication  
- [ ] Listing Creation and Browsing  
- [ ] Messaging and Scheduling  
- [ ] Deployment  

---

## **Contributing**
We welcome contributions to enhance the platform. To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Submit a pull request for review.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## **Contact**
For questions or feedback, please contact the project team at:
- **Email:** swipe4me@vanderbilt.edu
- **Instagram:** [@mealswipeexchange](https://instagram.com/swipe4me)

---