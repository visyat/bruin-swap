CREATE TABLE classes (
    course_code     varchar(6) PRIMARY KEY, --format: DI1234 (CSM51A, CS035L, etc.)
    sec_course_code varchar(6),  
    course_name     varchar(50)
);

CREATE TABLE users (
    user_id         varchar(15) PRIMARY KEY, 
    user_name       varchar(50), 
    passwd          varchar(40), --for authentication
    year_level      decimal(1,0), 
    email           varchar(50),

    -- class wishlist (limit to 5)
    wish_1          varchar(6) REFERENCES classes(course_code), 
    wish_2          varchar(6) REFERENCES classes(course_code),
    wish_3          varchar(6) REFERENCES classes(course_code),
    wish_4          varchar(6) REFERENCES classes(course_code),
    wish_5          varchar(6) REFERENCES classes(course_code)
);

CREATE TABLE active_transactions (
    transaction_id  smallint PRIMARY KEY, 
    user_id         varchar(15) REFERENCES users(user_id), 
    class_wanted    varchar (6) REFERENCES classes(course_code),
    class_to_drop   varchar (6) REFERENCES classes(course_code)
);

-- test code for insertion and updating
INSERT INTO classes (course_code, course_name) VALUES ('CS0111', 'Operating Systems');
INSERT INTO classes (course_code, course_name) VALUES ('CS0032', 'Intro to Computer Science II');
INSERT INTO classes (course_code, course_name) VALUES ('CS035L', 'Software Construction Lab');

INSERT INTO users VALUES ('vy', 'Vishal Yathish', 'test123', 1, 'vishalyathish1@g.ucla.edu', 'CS0111');
INSERT INTO users VALUES ('md', 'Matthew Day', 'test125', 3, 'mattday03@g.ucla.edu', 'CS035L');
INSERT INTO users VALUES ('cj', 'Christian Giron', 'cj20', 1, 'cjgironmichel27@g.ucla.edu', 'CS0032');
UPDATE users SET year_level=3 WHERE user_id='md';