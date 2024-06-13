const dropTables = `DROP TABLE IF EXISTS Staff, Book, User, Author, Category, Publisher, Location`;

const User = `CREATE TABLE IF NOT EXISTS User (
    User_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Username VARCHAR(20) NOT NULL,
    Password VARCHAR(165) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Address VARCHAR(50),
    NIC VARCHAR(20) NOT NULL,
    Mobile VARCHAR(10),
    Registered_Date DATE NOT NULL
)`;

const Author = `CREATE TABLE IF NOT EXISTS Author (
    Author_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Address VARCHAR(50),
    Mobile VARCHAR(10),
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
    Mobile VARCHAR(10)
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
    Book_ID INT AUTO_INCREMENT PRIMARY KEY,
    ISBN_Number VARCHAR(13) NOT NULL, 
    Title VARCHAR(50) NOT NULL,
    Author INTEGER NOT NULL,
    Description VARCHAR(300) NOT NULL,
    Language VARCHAR(20) NOT NULL,
    isAvailable BOOLEAN NOT NULL,
    Published_Date DATE,
    Category SMALLINT NOT NULL,
    Publisher INTEGER NOT NULL,
    Location INTEGER NOT NULL,
    FOREIGN KEY (Author) REFERENCES Author(Author_ID),
    FOREIGN KEY (Category) REFERENCES Category(Cat_ID),
    FOREIGN KEY (Publisher) REFERENCES Publisher(Publisher_ID),
    FOREIGN KEY (Location) REFERENCES Location(Loca_ID)
)`;

const Staff = `CREATE TABLE IF NOT EXISTS Staff (
    Staff_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    User_ID INTEGER NOT NULL,
    Role VARCHAR(10) NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
)`;

export { dropTables, User, Author, Category, Publisher, Location, Book, Staff };
