# G-Card – Making Digital Money Feel Like a Gift

## 📌 What is G-Card?

G-Card is a **phygital gifting application** that allows users to send and receive money along with an optional personal message.

While digital payments are fast and convenient, they often feel impersonal.
G-Card bridges this gap by **combining digital money with a physical gifting experience** using QR codes, making digital transfers feel more thoughtful and intentional.

---

## 🎯 Problem Statement (WB-05)

Digital money transfers lack the emotional value of physical gifting, while physical cash or gift cards are inconvenient and unsafe.

G-Card solves this by attaching digital money to a **QR-based gift**, allowing users to turn any physical object into a meaningful money voucher that can be redeemed securely.

---

## 🔁 How G-Card Works

### 🔐 User Authentication

Users log in or sign up using a simple **username and password** to access the application securely.

---

### 🏠 Dashboard

After logging in, users land on a dashboard that:

* Prompts them to send or receive a gift
* Provides two primary actions:

  * **Send**
  * **Receive**
* Displays a history of:

  * Gifts sent
  * Gifts received
  * Gift status and exchanged messages

---

### 🎁 Sending a Gift

1. The sender searches for the recipient using their **username**
2. After confirming the username, the sender:

   * Enters the **amount**
   * Chooses a payment method:

     * UPI ID
     * Scanner (simulated)
3. Once payment is completed, a confirmation message is shown
4. The sender can add an **optional personal message**
5. A **QR code and unique gift code** are generated
6. The QR code can be printed or shared along with a physical gift

---

### 📥 Receiving a Gift

The receiver can redeem a gift in **two ways**:

#### Option 1: Code Entry

* Enter the unique gift code
* Receive the money and view the sender’s message
* Send a reply message

#### Option 2: QR Scan

* Scan the QR code using:

  * Phone camera
  * In-app scanner (simulated)
* Only the **intended recipient** can open and redeem the gift

---

### 💬 Message Interaction

After redeeming a gift, the receiver can send a **reply message**.
This reply appears in the sender’s dashboard history, enabling a simple two-way interaction.

---

### ⏳ Gift Control & Expiry

* QR codes have a defined **expiry time**
* If a gift is not redeemed:

  * The sender can **cancel** it
  * The sender can **regenerate** a new QR code
* Gift status is clearly shown in the dashboard

---

## 🔐 Security (Prototype-Level)

The following security concepts are demonstrated as part of the prototype:

* Encrypted local storage (conceptual)
* Biometric authentication (UI simulation)
* Dead man’s switch implemented through QR expiry

These features illustrate the intended secure behavior of the system.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS / CSS Modules
* QR code generation library

### Backend

* Node.js
* Express.js
* MongoDB (or in-memory storage for prototype)

### Payment

* Simulated UPI / card payment flow

---

## ✅ Conclusion

G-Card demonstrates how digital payments can be transformed into **meaningful gifting experiences**.

By combining QR codes, secure transactions, and optional personal messages, the project shows a practical approach to bringing emotion and intention back into digital money transfers.

---

<video width="100%" controls>
  <source src="desktop/hackforge.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
