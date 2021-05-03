USE BloodDonerSite;

CREATE TABLE People(
	id VARCHAR(256) NOT NULL,
	personFirstName VARCHAR(16) NOT NULL,
	personLastName VARCHAR(16) NOT NULL,
	personUsername VARCHAR(64) NOT NULL,
	personPassword VARCHAR(256) NOT NULL,
	personLocation VARCHAR(64) NOT NULL,
	personGender VARCHAR(16) NOT NULL,
	personYear INT NOT NULL,
	personContact VARCHAR(16) NOT NULL,
	personState VARCHAR(16) NOT NULL,
	personPinCode VARCHAR(16) NOT NULL,
	personTaluka VARCHAR(16) NOT NULL,
	personLastDonated DATE,
	personType VARCHAR(16) NOT NULL CHECK(
		personType = 'user'
		OR
		personType = 'admin'
		OR
		personType = 'paidDoner'
	),
	personDonerType VARCHAR(15) CHECK(
		personDonerType = 'volunteer'
		OR
		personDonerType = 'paidDoner'
	),
	personBloodType VARCHAR(256) REFERENCES Blood(id),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	personCode INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE FamilyMembers(
	id VARCHAR(256) PRIMARY KEY,
	userId VARCHAR(256) NOT NULL REFERENCES People(id),
	memberId VARCHAR(256) NOT NULL REFERENCES People(id),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Requests(
	id VARCHAR(256) PRIMARY KEY,
	reqAuthority VARCHAR(256) NOT NULL REFERENCES Authorities(id),
	reqUser VARCHAR(256) NOT NULL REFERENCES People(id),
	reqUserName VARCHAR(32) NOT NULL,
	reqFrom VARCHAR(256) NOT NULL REFERENCES People(id),
	reqFromName VARCHAR(32) NOT NULL,
	reqFromContact VARCHAR(16) NOT NULL,
	active BOOLEAN NOT NULL,
	reqBloodType VARCHAR(256) NOT NULL REFERENCES Blood(id),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Blood(
	id VARCHAR(256) PRIMARY KEY,
	bloodType VARCHAR(8) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Notifications(
	id VARCHAR(256) PRIMARY KEY,
	toUser VARCHAR(256) NOT NULL REFERENCES People(id),
	fromUser VARCHAR(256) NOT NULL REFERENCES People(id),
	fromAuthority VARCHAR(256) REFERENCES Authorities(id),
	fromUserName VARCHAR(32) NOT NULL,
	message VARCHAR(256) NOT NULL,
	messageType VARCHAR(16) CHECK(
		messageType = 'member'
		OR 
		messageType = 'doner'
	),
	active BOOLEAN,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Authorities(
	id VARCHAR(256) PRIMARY KEY,
	authorityName VARCHAR(128) NOT NULL,
	authorityLocation VARCHAR(64) NOT NULL,
	authorityUsername VARCHAR(64) NOT NULL,
	authorityPassword VARCHAR(256) NOT NULL,
	authorityState VARCHAR(16) NOT NULL,
	authorityPinCode VARCHAR(8) NOT NULL,
	authorityTaluka VARCHAR(16) NOT NULL,
	authorityContact VARCHAR(16) NOT NULL,
	authorityAdmin VARCHAR(256) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BloodDonateds(
	id VARCHAR(256) NOT NULL PRIMARY KEY,
	donateDate DATE NOT NULL,
	donateUser VARCHAR(256) NOT NULL REFERENCES People(id),
	donateAuthority VARCHAR(256) NOT NULL REFERENCES Authorities(id),
	donateBlood VARCHAR(256) NOT NULL REFERENCES Blood(id),
	donated BOOLEAN NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Blood(id, bloodType)
VALUES	("1", "A+"),
		("2", "A-"),
		("3", "B+"),
		("4", "B-"),
		("5", "O+"),
		("6", "O-"),
		("7", "AB+"),
		("8", "AB-");

INSERT INTO People
VALUES(
	"010101010101",
	"Test",
	"Testing",
	"test@gmail.com",
	"$2a$10$.8EELR6izImULpwD/i0xp.65oTGlaxDEKQbUw7.nshwv5crho8wyq",
	"Test",
	"Male",
	1997,
	"1234567890",
	"Test",
	"123456",
	"Test",
	SYSDATE(),
	"admin",
	"volunteer",
	"1",
	NOW(),
	NOW(),
	1
);

ALTER TABLE Notifications ADD COLUMN messageType VARCHAR(16) CHECK(
		messageType = 'member'
		OR 
		messageType = 'doner'
	);

SHOW TABLES;

SELECT * FROM Requests r ;

DROP TABLE Requests;

UPDATE Requests SET active = true WHERE 1=1;

DELETE FROM Notifications WHERE 1=1;

DROP TABLE People ;

UPDATE People SET personPassword="$2a$10$.8EELR6izImULpwD/i0xp.65oTGlaxDEKQbUw7.nshwv5crho8wyq" WHERE personFirstName="TEST";
UPDATE Requests SET active=1 WHERE 1=1;

DELETE FROM People WHERE personLastName = 'Parsekar';





