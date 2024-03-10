CREATE TABLE classes (
    section_code    varchar(9) PRIMARY KEY, --format: DI012341A (2 CHAR Dept, 5 CHAR Course, 2 CHAR Disc)
    department      varchar(10),
    course_num      varchar(7), 
    course_name     varchar(50),
    professor       varchar(50), 
    disc_section    varchar(2)
);

CREATE TABLE users (
    user_id         varchar(15) PRIMARY KEY, 
    user_name       varchar(50), 
    passwd          varchar(40), --for authentication
    year_level      decimal(1,0), 
    email           varchar(50),

    --currently enrolled courses (limit to 7)
    course_1        varchar(9) REFERENCES classes(section_code),
    course_2        varchar(9) REFERENCES classes(section_code),
    course_3        varchar(9) REFERENCES classes(section_code),
    course_4        varchar(9) REFERENCES classes(section_code),
    course_5        varchar(9) REFERENCES classes(section_code),
    course_6        varchar(9) REFERENCES classes(section_code),
    course_7        varchar(9) REFERENCES classes(section_code),

    -- class wishlist (limit to 5)
    wish_1          varchar(9) REFERENCES classes(section_code), 
    wish_2          varchar(9) REFERENCES classes(section_code),
    wish_3          varchar(9) REFERENCES classes(section_code),
    wish_4          varchar(9) REFERENCES classes(section_code),
    wish_5          varchar(9) REFERENCES classes(section_code)
);

CREATE TABLE active_transactions (
    transaction_id  smallint PRIMARY KEY, 
    user_id         varchar(15) REFERENCES users(user_id), 
    class_wanted    varchar (9) REFERENCES classes(section_code),
    class_to_drop   varchar (9) REFERENCES classes(section_code)
);

-- test code for insertion and updating

INSERT INTO classes VALUES ('CS000331A', 'COM SCI', '33', 'Introduction to Computer Organization', 'Reinman, G.D.', '1A');
INSERT INTO classes VALUES ('CS000331B', 'COM SCI', '33', 'Introduction to Computer Organization', 'Reinman, G.D.', '1B');
INSERT INTO classes VALUES ('CS000331C', 'COM SCI', '33', 'Introduction to Computer Organization', 'Reinman, G.D.', '1C');
INSERT INTO classes VALUES ('CS000331D', 'COM SCI', '33', 'Introduction to Computer Organization', 'Reinman, G.D.', '1D');
INSERT INTO classes VALUES ('CS000331E', 'COM SCI', '33', 'Introduction to Computer Organization', 'Reinman, G.D.', '1E');
INSERT INTO classes VALUES ('CS000331F', 'COM SCI', '33', 'Introduction to Computer Organization', 'Reinman, G.D.', '1F');
INSERT INTO classes VALUES ('CS000331G', 'COM SCI', '33', 'Introduction to Computer Organization', 'Reinman, G.D.', '1G');
INSERT INTO classes VALUES ('CS0035L1A', 'COM SCI', '35L', 'Software Construction', 'Eggert, P.R.', '1A');
INSERT INTO classes VALUES ('CS0035L1B', 'COM SCI', '35L', 'Software Construction', 'Eggert, P.R.', '1B');
INSERT INTO classes VALUES ('CS0035L1C', 'COM SCI', '35L', 'Software Construction', 'Eggert, P.R.', '1C');
INSERT INTO classes VALUES ('CS001111A', 'COM SCI', '111', 'Operating Systems Principles', 'Reiher, P.L.', '1A');
INSERT INTO classes VALUES ('CS001111B', 'COM SCI', '111', 'Operating Systems Principles', 'Reiher, P.L.', '1B');
INSERT INTO classes VALUES ('CS001111C', 'COM SCI', '111', 'Operating Systems Principles', 'Reiher, P.L.', '1C');
INSERT INTO classes VALUES ('CS001111D', 'COM SCI', '111', 'Operating Systems Principles', 'Reiher, P.L.', '1D');

INSERT INTO users VALUES ('vy', 'Vishal Yathish', 'test123', 1, 'vishalyathish1@g.ucla.edu');
INSERT INTO users VALUES ('md', 'Matthew Day', 'test125', 3, 'mattday03@g.ucla.edu');
INSERT INTO users VALUES ('cj', 'Christian Giron', 'cj20', 3, 'cjgironmichel27@g.ucla.edu');
INSERT INTO users VALUES ('srsrsr', 'Sriram Rajagopal', 'officer_derp', 1, 'sriram42@ucla.edu');