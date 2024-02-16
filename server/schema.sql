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

