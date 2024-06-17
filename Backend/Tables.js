const dropTables = `DROP TABLE IF EXISTS Borrow, Reserve, Review, Staff, Book, Book_Copy,  Location, Publisher, Category, Author, User`;

const User = `CREATE TABLE IF NOT EXISTS User (
    User_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Username VARCHAR(20) NOT NULL,
    Password VARCHAR(165) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Address VARCHAR(50),
    NIC VARCHAR(20) NOT NULL,
    Mobile VARCHAR(20),
    Registered_Date DATE NOT NULL
)`;

const Author = `CREATE TABLE IF NOT EXISTS Author (
    Author_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Address VARCHAR(50),
    Mobile VARCHAR(20),
    NIC VARCHAR(20) NOT NULL
)`;

const Category = `CREATE TABLE IF NOT EXISTS Category (
    Cat_ID SMALLINT AUTO_INCREMENT PRIMARY KEY,
    Cat_Name VARCHAR(30) NOT NULL
)`;

const Publisher = `CREATE TABLE IF NOT EXISTS Publisher (
    Publisher_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Publisher_First_Name VARCHAR(50) NOT NULL,
    Publisher_Last_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Address VARCHAR(50),
    Mobile VARCHAR(20)
)`;

const Location = `CREATE TABLE IF NOT EXISTS Location (
    Loca_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Floor SMALLINT NOT NULL,
    Section SMALLINT NOT NULL,
    Shelf_Number SMALLINT NOT NULL,
    RowNum SMALLINT NOT NULL,
    isEmpty BOOLEAN NOT NULL
)`;

const Book = `CREATE TABLE IF NOT EXISTS Book (
    Book_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    ISBN_Number VARCHAR(20) NOT NULL, 
    Title VARCHAR(50) NOT NULL,
    Author INTEGER NOT NULL,
    Description VARCHAR(300) NOT NULL,
    Language VARCHAR(50) NOT NULL,
    Published_Date DATE,
    Category SMALLINT NOT NULL,
    Publisher INTEGER NOT NULL,
    FOREIGN KEY (Author) REFERENCES Author(Author_ID),
    FOREIGN KEY (Category) REFERENCES Category(Cat_ID),
    FOREIGN KEY (Publisher) REFERENCES Publisher(Publisher_ID)
)`;

const Book_Copy = `CREATE TABLE IF NOT EXISTS Book_Copy (
    Copy_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Book_ID INTEGER NOT NULL,
    isReserved BOOLEAN NOT NULL,
    isBorrowed BOOLEAN NOT NULL,
    Book_Location INTEGER NOT NULL,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID),
    FOREIGN KEY (Book_Location) REFERENCES Location(Loca_ID)
)`;

const Staff = `CREATE TABLE IF NOT EXISTS Staff (
    Staff_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    User_ID INTEGER NOT NULL,
    Role VARCHAR(20) NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
)`;

const Review = `CREATE TABLE IF NOT EXISTS Review (
    Review_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    User_ID INTEGER NOT NULL,
    Book_ID INTEGER NOT NULL,
    Rating SMALLINT NOT NULL,
    Review VARCHAR(200),
    Review_Date DATE NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
)`;

//here Book_ID means Copy_ID
const Borrow = `CREATE TABLE IF NOT EXISTS Borrow (
    Borrow_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    User_ID INTEGER NOT NULL,
    Book_ID INTEGER NOT NULL,  -- This references Copy_ID in Book_Copy table
    Borrow_Date DATE NOT NULL,
    Return_Time TIME NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book_Copy(Copy_ID)
)`;

const Reserve = `CREATE TABLE IF NOT EXISTS Reserve (
    Reserve_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    User_ID INTEGER NOT NULL,
    Book_ID INTEGER NOT NULL,  -- This references Copy_ID in Book_Copy table
    isComplete BOOLEAN NOT NULL,
    Reserve_Date DATE NOT NULL,
    Reserve_Time TIME NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book_Copy(Copy_ID)
)`;

export {
  dropTables,
  User,
  Author,
  Category,
  Publisher,
  Location,
  Book,
  Staff,
  Review,
  Book_Copy,
  Borrow,
  Reserve
};
