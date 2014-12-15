SET FOREIGN_KEY_CHECKS = 0;

drop table if exists accounts;
drop table if exists buddies;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE accounts(
username  varchar(20) unique PRIMARY KEY not null, 
passphrase varchar(20) not null,
account_type varchar(10) not null,
fullname varchar(30) not null,
email varchar(30) not null,
birthday date not null,
canvas blob
);

CREATE TABLE buddies(
username varchar(20) not null, 
friend varchar(20) not null,
accepted bool not null,
constraint pk_buddies primary key (username, friend),
constraint fk_buddies_username foreign key (username) references accounts(username),
constraint fk_buddies_friend foreign key (username) references accounts(username)
);


