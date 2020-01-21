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
   `password` varchar(256) NOT NULL,
   `created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_on` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`id`)
);