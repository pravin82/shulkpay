-- 20th January 2020 Created by Pravin

CREATE TABLE IF NOT EXISTS `payments` (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,     
   `student_id` int(11) NOT NULL,     
   `amount` int(32) NOT NULL,
   `created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_on` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`id`)
);

-- 21st January 2020 Created by Pravin

CREATE TABLE IF NOT EXISTS `users` (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,     
   `school_id` int(11) NOT NULL,     
   `username` varchar(256) NOT NULL,
   `name` varchar(256) NOT NULL,
   `password` varchar(256) NOT NULL,
   `created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_on` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`id`)
);

-- 24th January 2020 Created by Pravin

CREATE TABLE IF NOT EXISTS `schools` (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,     
   `name` varchar(256) NOT NULL,
   `created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_on` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`id`)
);

insert into schools(name) values('Pravin High School');

-- 7th Frbruary created by Pravin

CREATE TABLE IF NOT EXISTS `students` (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,     
   `school_id` int(11) NOT NULL,     
   `name` varchar(256) NOT NULL,
   `roll_no` varchar(256) NOT NULL,
   `class_section_id` varchar(256) NOT NULL,
   `created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_on` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `class_section` (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,     
   `class` varchar(256) NOT NULL,
   `section` varchar(256) NOT NULL,
   `created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_on` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`id`)
);

insert into class_section(class, section) values("nursery", "A");
insert into class_section(class, section) values("nursery", "B");
insert into class_section(class, section) values("nursery", "C");
insert into class_section(class, section) values("lkg", "A");
insert into class_section(class, section) values("lkg", "B");
insert into class_section(class, section) values("lkg", "C");
insert into class_section(class, section) values("ukg", "A");
insert into class_section(class, section) values("ukg", "B");
insert into class_section(class, section) values("ukg", "C");
insert into class_section(class, section) values("1", "A");
insert into class_section(class, section) values("1", "B");
insert into class_section(class, section) values("1", "C");
insert into class_section(class, section) values("2", "A");
insert into class_section(class, section) values("2", "B");
insert into class_section(class, section) values("2", "C");
insert into class_section(class, section) values("3", "A");
insert into class_section(class, section) values("3", "B");
insert into class_section(class, section) values("3", "C");
insert into class_section(class, section) values("4", "A");
insert into class_section(class, section) values("4", "B");
insert into class_section(class, section) values("4", "C");
insert into class_section(class, section) values("5", "A");
insert into class_section(class, section) values("5", "B");
insert into class_section(class, section) values("5", "C");
insert into class_section(class, section) values("6", "A");
insert into class_section(class, section) values("6", "B");
insert into class_section(class, section) values("6", "C");
insert into class_section(class, section) values("7", "A");
insert into class_section(class, section) values("7", "B");
insert into class_section(class, section) values("7", "C");
insert into class_section(class, section) values("8", "A");
insert into class_section(class, section) values("8", "B");
insert into class_section(class, section) values("8", "C");
insert into class_section(class, section) values("9", "A");
insert into class_section(class, section) values("9", "B");
insert into class_section(class, section) values("9", "C");
insert into class_section(class, section) values("10", "A");
insert into class_section(class, section) values("10", "B");
insert into class_section(class, section) values("10", "C");


-- 11th Frbruary 2020 created by Pravin

alter table payments add column remarks varchar(255);












































